package com.howoocast.hywtl_has.project_target_review.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.project_target_review.domain.ProjectTargetReviewDetail;
import com.howoocast.hywtl_has.project_target_review.exception.ProjectTargetReviewException;
import com.howoocast.hywtl_has.project_target_review.exception.ProjectTargetReviewException.ProjectTargetReviewExceptionType;
import com.howoocast.hywtl_has.project_target_review.parameter.ProjectTargetReviewParameter;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_target_review.repository.ProjectTargetReviewRepository;
import com.howoocast.hywtl_has.project_target_review.view.ProjectTargetReviewListView;
import com.howoocast.hywtl_has.project_target_review.domain.ProjectTargetReview;
import com.howoocast.hywtl_has.project_target_review.view.ProjectTargetReviewView;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectTargetReviewService {

    private final ProjectTargetReviewRepository repository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<ProjectTargetReviewListView> getReviewList(Long projectId) {
        return repository.findByProject_Id(projectId).stream()
            .map(ProjectTargetReviewListView::assemble)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProjectTargetReviewView getOne(Long id) {
        ProjectTargetReview instance = this.load(id);
        return ProjectTargetReviewView.assemble(instance);
    }

    @Transactional
    public ProjectTargetReviewView addReview(Long projectId, String username, ProjectTargetReviewParameter params) {
        ProjectTargetReview instance = ProjectTargetReview.of(
            projectRepository.findById(projectId).orElseThrow(() -> new NotFoundException("project", projectId)),
            params.getConfirmed(),
            params.getStatus(),
            params.getTitle(),
            params.getMemo(),
            userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("user", String.format("username: %s", username))),
            params.getDetailList().stream()
                .map(detailParams -> ProjectTargetReviewDetail.of(
                    detailParams.getBuildingName(),
                    detailParams.getFloorCount(),
                    detailParams.getBaseCount(),
                    detailParams.getHeight(),
                    detailParams.getArea(),
                    detailParams.getSpecialWindLoadConditionList(),
                    detailParams.getTestList(),
                    detailParams.getMemo1(),
                    detailParams.getMemo2()
                ))
                .collect(Collectors.toList())
        );
        if (instance.getConfirmed()) {
            this.checkConfirmed(instance.getProjectId());
        }
        return ProjectTargetReviewView.assemble(repository.save(instance));
    }

    @Transactional
    public void updateReview(Long id, ProjectTargetReviewParameter params) {
        ProjectTargetReview instance = this.load(id);
        if (!instance.getConfirmed() && params.getConfirmed()) {
            checkConfirmed(instance.getProjectId());
        }
        instance.update(
            params.getConfirmed(),
            params.getStatus(),
            params.getTitle(),
            params.getMemo(),
            params.getDetailList().stream()
                .map(detailParams -> ProjectTargetReviewDetail.of(
                    detailParams.getBuildingName(),
                    detailParams.getFloorCount(),
                    detailParams.getBaseCount(),
                    detailParams.getHeight(),
                    detailParams.getArea(),
                    detailParams.getSpecialWindLoadConditionList(),
                    detailParams.getTestList(),
                    detailParams.getMemo1(),
                    detailParams.getMemo2()
                ))
                .collect(Collectors.toList())
        );
    }

    @Transactional
    public void confirmReview(Long id) {
        ProjectTargetReview instance = this.load(id);
        repository.findByProject_IdAndConfirmedIsTrue(instance.getProjectId())
                .ifPresent(ProjectTargetReview::confirmOff);
        instance.confirmOn();
    }

    @Transactional
    public void delete(Long id) {
        repository.findById(id).ifPresent(instance -> repository.deleteById(instance.getId()));
    }

    private ProjectTargetReview load(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("project-target-review", id));
    }

    private void checkConfirmed(Long projectId) {
        if (repository.findByProject_IdAndConfirmedIsTrue(projectId).isPresent()) {
            throw new ProjectTargetReviewException(ProjectTargetReviewExceptionType.CONFIRMED_EXISTS);
        }
    }
}
