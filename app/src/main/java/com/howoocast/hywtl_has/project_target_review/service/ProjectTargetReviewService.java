package com.howoocast.hywtl_has.project_target_review.service;

import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project_target_review.domain.ProjectTargetReviewDetail;
import com.howoocast.hywtl_has.project_target_review.parameter.ProjectTargetReviewAddParameter;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_target_review.repository.ProjectTargetReviewRepository;
import com.howoocast.hywtl_has.project_target_review.view.ProjectTargetReviewListView;
import com.howoocast.hywtl_has.project_target_review.domain.ProjectTargetReview;
import com.howoocast.hywtl_has.project_target_review.view.ProjectTargetReviewView;
import com.howoocast.hywtl_has.user.domain.User;
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

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ProjectTargetReviewRepository projectTargetReviewRepository;

    @Transactional(readOnly = true)
    public List<ProjectTargetReviewListView> getReviewList(Long projectId) {
        return ProjectTargetReview.loadByProjectId(projectTargetReviewRepository, projectId).stream()
            .map(ProjectTargetReviewListView::assemble).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProjectTargetReviewView getOne(Long id) {
        return ProjectTargetReviewView.assemble(ProjectTargetReview.load(projectTargetReviewRepository, id));
    }

    @Transactional
    public void addReview(Long projectId, String username, ProjectTargetReviewAddParameter params) {
        ProjectTargetReview.of(
            projectTargetReviewRepository,
            Project.load(projectRepository, projectId),
            params.getConfirmed(),
            params.getStatus(),
            params.getTitle(),
            params.getMemo(),
            User.loadByUsername(userRepository, username),
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
    public ProjectTargetReviewListView confirmReview(Long id) {
        ProjectTargetReview source = ProjectTargetReview.load(projectTargetReviewRepository, id);
        source.confirmOn();
        return ProjectTargetReviewListView.assemble(source);
    }

}
