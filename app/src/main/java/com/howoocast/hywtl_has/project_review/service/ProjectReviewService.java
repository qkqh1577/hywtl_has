package com.howoocast.hywtl_has.project_review.service;

import com.howoocast.hywtl_has.common.exception.DuplicatedValueException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.file.service.FileItemService;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_review.domain.ProjectReview;
import com.howoocast.hywtl_has.project_review.domain.ProjectReviewDetail;
import com.howoocast.hywtl_has.project_review.parameter.ProjectReviewParameter;
import com.howoocast.hywtl_has.project_review.repository.ProjectReviewRepository;
import com.howoocast.hywtl_has.project_review.view.ProjectReviewListView;
import com.howoocast.hywtl_has.project_review.view.ProjectReviewView;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectReviewService {

    private final ProjectReviewRepository repository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    private final FileItemService fileItemService;

    @Transactional(readOnly = true)
    public List<ProjectReviewListView> getList(Long projectId) {
        return repository.findByProject_Id(projectId).stream()
            .map(ProjectReviewListView::assemble)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProjectReviewView getOne(Long id) {
        ProjectReview instance = this.load(id);
        return ProjectReviewView.assemble(instance);
    }

    @Transactional
    public ProjectReviewView add(Long projectId, String username, ProjectReviewParameter params) {
        if (repository.findByCode(params.getCode()).isPresent()) {
            throw new DuplicatedValueException("project-review", "code", params.getCode());
        }

        Project project = projectRepository
            .findById(projectId)
            .orElseThrow(() -> new NotFoundException("project", projectId));

        User writer = userRepository.findByUsername(username)
            .orElseThrow(() -> new NotFoundException("user", String.format("username: %s", username)));
        ProjectReview instance = ProjectReview.of(
            project,
            params.getStatus(),
            params.getCode(),
            params.getLandFigureCount(),
            params.getTestList(),
            writer,
            params.getDetailList().stream()
                .map(item -> ProjectReviewDetail.of(
                    item.getBuildingName(),
                    item.getFloorCount(),
                    item.getBaseCount(),
                    item.getHeight(),
                    item.getArea(),
                    item.getSpecialWindLoadConditionList(),
                    item.getTestList(),
                    item.getMemo1(),
                    item.getMemo2()
                ))
                .collect(Collectors.toList()),
            Optional.ofNullable(params.getFileList())
                .map(list -> list.stream()
                    .map(fileItemService::build)
                    .map(Objects::requireNonNull)
                    .collect(Collectors.toList())
                )
                .orElse(null)
        );

        return ProjectReviewView.assemble(repository.save(instance));
    }

    @Transactional
    public void change(Long id, ProjectReviewParameter params) {
        repository.findByCode(params.getCode()).ifPresent(instance -> {
            if (!instance.getId().equals(id)) {
                throw new DuplicatedValueException("project-review", "code", params.getCode());
            }
        });

        ProjectReview instance = this.load(id);
        List<ProjectReviewDetail> detailList = params.getDetailList().stream()
            .map(detailParam -> {
                if (Objects.isNull(detailParam.getId())) {
                    return ProjectReviewDetail.of(
                        detailParam.getBuildingName(),
                        detailParam.getFloorCount(),
                        detailParam.getBaseCount(),
                        detailParam.getHeight(),
                        detailParam.getArea(),
                        detailParam.getSpecialWindLoadConditionList(),
                        detailParam.getTestList(),
                        detailParam.getMemo1(),
                        detailParam.getMemo2()
                    );
                }
                ProjectReviewDetail detailInstance = instance.getDetailList().stream()
                    .filter(item -> item.getId().equals(detailParam.getId()))
                    .findFirst()
                    .orElseThrow(() -> new NotFoundException("project-review", detailParam.getId()));
                detailInstance.change(
                    detailParam.getBuildingName(),
                    detailParam.getFloorCount(),
                    detailParam.getBaseCount(),
                    detailParam.getHeight(),
                    detailParam.getArea(),
                    detailParam.getSpecialWindLoadConditionList(),
                    detailParam.getTestList(),
                    detailParam.getMemo1(),
                    detailParam.getMemo2()
                );
                return detailInstance;
            })
            .collect(Collectors.toList());

        instance.change(
            params.getStatus(),
            params.getCode(),
            params.getLandFigureCount(),
            params.getTestList(),
            detailList,
            Optional.ofNullable(params.getFileList())
                .map(list -> list.stream()
                    .map(fileItemService::build)
                    .map(Objects::requireNonNull)
                    .collect(Collectors.toList())
                )
                .orElse(null)
        );
    }

    @Transactional
    public void delete(Long id) {
        repository.findById(id).ifPresent(instance -> repository.deleteById(instance.getId()));
    }

    private ProjectReview load(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("project-review", id));
    }
}
