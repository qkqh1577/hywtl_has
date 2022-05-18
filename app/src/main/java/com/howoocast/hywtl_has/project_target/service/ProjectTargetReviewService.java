package com.howoocast.hywtl_has.project_target.service;

import com.howoocast.hywtl_has.common.exception.DuplicatedValueException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.file.service.FileItemService;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project_target.domain.ProjectTargetReviewDetail;
import com.howoocast.hywtl_has.project_target.parameter.ProjectTargetReviewParameter;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_target.repository.ProjectTargetReviewRepository;
import com.howoocast.hywtl_has.project_target.view.ProjectTargetReviewListView;
import com.howoocast.hywtl_has.project_target.domain.ProjectTargetReview;
import com.howoocast.hywtl_has.project_target.view.ProjectTargetReviewView;
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
public class ProjectTargetReviewService {

    private final ProjectTargetReviewRepository repository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    private final FileItemService fileItemService;

    @Transactional(readOnly = true)
    public List<ProjectTargetReviewListView> getList(Long projectId) {
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
    public ProjectTargetReviewView add(Long projectId, String username, ProjectTargetReviewParameter params) {
        if (repository.findByCode(params.getCode()).isPresent()) {
            throw new DuplicatedValueException("project-target-review", "code", params.getCode());
        }

        Project project = projectRepository
            .findById(projectId)
            .orElseThrow(() -> new NotFoundException("project", projectId));

        User writer = userRepository.findByUsername(username)
            .orElseThrow(() -> new NotFoundException("user", String.format("username: %s", username)));
        ProjectTargetReview instance = ProjectTargetReview.of(
            project,
            params.getStatus(),
            params.getCode(),
            params.getLandFigureCount(),
            params.getTestList(),
            writer,
            params.getDetailList().stream()
                .map(item -> ProjectTargetReviewDetail.of(
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

        return ProjectTargetReviewView.assemble(repository.save(instance));
    }

    @Transactional
    public void change(Long id, ProjectTargetReviewParameter params) {
        repository.findByCode(params.getCode()).ifPresent(instance -> {
            if (!instance.getId().equals(id)) {
                throw new DuplicatedValueException("project-target-review", "code", params.getCode());
            }
        });

        ProjectTargetReview instance = this.load(id);
        List<ProjectTargetReviewDetail> detailList = params.getDetailList().stream()
            .map(detailParam -> {
                if (Objects.isNull(detailParam.getId())) {
                    return ProjectTargetReviewDetail.of(
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
                ProjectTargetReviewDetail detailInstance = instance.getDetailList().stream()
                    .filter(item -> item.getId().equals(detailParam.getId()))
                    .findFirst()
                    .orElseThrow(() -> new NotFoundException("project-target-review", detailParam.getId()));
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

    private ProjectTargetReview load(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("project-target-review", id));
    }

}
