package com.howoocast.hywtl_has.project_estimate.service;

import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.common.exception.FileSystemException;
import com.howoocast.hywtl_has.common.exception.FileSystemException.FileSystemExceptionType;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.file.domain.FileItem;
import com.howoocast.hywtl_has.file.repository.FileItemRepository;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_document.domain.ProjectDocument;
import com.howoocast.hywtl_has.project_document.repository.ProjectDocumentRepository;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectCustomEstimate;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateComplexBuilding;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateComplexSite;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimatePlan;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectEstimateComplexBuildingParameter;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectEstimateComplexSiteParameter;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectEstimateConfirmParameter;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectEstimatePlanParameter;
import com.howoocast.hywtl_has.project_estimate.repository.ProjectCustomEstimateRepository;
import com.howoocast.hywtl_has.project_estimate.repository.ProjectEstimateRepository;
import com.howoocast.hywtl_has.project_log.domain.ProjectLogEvent;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectEstimateService {

    private final ProjectEstimateRepository repository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final ProjectDocumentRepository documentRepository;
    private final ApplicationEventPublisher eventPublisher;
    private final FileItemRepository fileItemRepository;
    private final ProjectCustomEstimateRepository customEstimateRepository;

    @Transactional(readOnly = true)
    public ProjectEstimate get(Long id) {
        return repository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(ProjectEstimate.KEY, id);
        });
    }

    @Transactional(readOnly = true)
    public List<ProjectEstimate> getList(
        Long projectId
    ) {
        return repository.findByProject_Id(projectId);
    }

    @Transactional(readOnly = true)
    @Nullable
    public List<ProjectEstimate> getFinal(
        Long projectId
    ) {
        return repository.findByProject_IdAndConfirmed(projectId, Boolean.TRUE);
    }

    @Transactional
    public void confirm(Long projectId, ProjectEstimateConfirmParameter parameter) {
        List<ProjectEstimate> projectEstimateList = repository.findByProject_Id(projectId);

        if (Objects.isNull(parameter.getEstimateIdList())) {
            projectEstimateList.forEach(e -> e.changeConfirmed(Boolean.FALSE));
            return;
        }

        List<ProjectEstimate> confirmedList = new ArrayList<>();
        projectEstimateList.forEach(e -> parameter.getEstimateIdList().forEach(fe -> {
            if (e.getId().equals(fe)) {
                confirmedList.add(e);
            }
        }));

        List<ProjectEstimate> unconfirmedList = projectEstimateList.stream()
            .filter(e -> !confirmedList.contains(e))
            .collect(Collectors.toList());

        confirmedList.forEach(fe -> updateHistory(confirmedList, fe, Boolean.TRUE));

        unconfirmedList.forEach(ue -> updateHistory(unconfirmedList, ue, Boolean.FALSE));
    }

    protected ProjectEstimate of(
        Long projectId,
        String username
    ) {
        Project project = new CustomFinder<>(projectRepository, Project.class).byId(projectId);
        User writer = new CustomFinder<>(userRepository, User.class).byField(username, "username");
        String code = getCode(project);

        return ProjectEstimate.of(
            code,
            writer,
            project
        );
    }

    protected void changePlan(
        ProjectEstimate instance,
        @Nullable ProjectEstimatePlanParameter parameter
    ) {
        List<EventEntity> eventList = instance.changePlan(
            Optional.ofNullable(parameter)
                .map(plan -> ProjectEstimatePlan.of(
                    plan.getEstimateDate(),
                    plan.getExpectedServiceDate(),
                    plan.getExpectedTestDeadline(),
                    plan.getExpectedFinalReportDeadline(),
                    plan.getTestAmount(),
                    plan.getReviewAmount(),
                    plan.getDiscountAmount(),
                    plan.getTotalAmount(),
                    new CustomFinder<>(userRepository, User.class).byIdIfExists(plan.getManager1Id()),
                    new CustomFinder<>(userRepository, User.class).byIdIfExists(plan.getManager2Id()),
                    plan.getIsLh(),
                    true))
                .orElse(null));
        eventList.stream().map(event -> ProjectLogEvent.of(instance.getProject(), event))
            .forEach(eventPublisher::publishEvent);
    }

    protected void changeSiteList(
        ProjectEstimate instance,
        @Nullable List<ProjectEstimateComplexSiteParameter> siteList
    ) {
        List<EventEntity> eventList = instance.changeSiteList(Optional.ofNullable(siteList)
            .map(list -> list.stream()
                .map(item -> ProjectEstimateComplexSite.of(
                    item.getName(),
                    item.getWithEnvironmentTest(),
                    item.getEstimateFigureDifficulty(),
                    item.getFigureDifficulty(),
                    new CustomFinder<>(userRepository, User.class)
                        .byIdIfExists(item.getManagerId())))
                .collect(Collectors.toList()))
            .orElse(Collections.emptyList()));
        repository.save(instance);
        eventList.stream().map(event -> ProjectLogEvent.of(instance.getProject(), event))
            .forEach(eventPublisher::publishEvent);
    }

    protected void changeBuildingList(
        ProjectEstimate instance,
        @Nullable List<ProjectEstimateComplexBuildingParameter> buildingList
    ) {
        List<EventEntity> eventList = instance.changeBuildingList(
            Optional.ofNullable(buildingList)
                .map(list -> list.stream()
                    .map(item -> ProjectEstimateComplexBuilding.of(
                        item.getName(),
                        Optional.ofNullable(item.getSiteSeq()).map(seq -> instance.getSiteList().get(item.getSiteSeq()))
                            .orElse(null),
                        item.getShape(),
                        item.getFloorCount(),
                        item.getHeight(),
                        item.getBaseArea(),
                        new CustomFinder<>(documentRepository, ProjectDocument.class).byIdIfExists(
                            item.getBuildingDocumentId()),
                        item.getConditionList(),
                        item.getInTest(),
                        item.getTestTypeList(),
                        item.getEstimateFigureDifficulty(),
                        item.getEstimateTestDifficulty(),
                        item.getEstimateEvaluationDifficulty(),
                        item.getEstimateReportDifficulty()))
                    .collect(Collectors.toList()))
                .orElse(Collections.emptyList()));
        repository.save(instance);
        eventList.stream().map(event -> ProjectLogEvent.of(instance.getProject(), event))
            .forEach(eventPublisher::publishEvent);
    }

    private String getCode(Project project) {
        Long nextSeq = repository.findNextSeq(project.getId());

        String code = "";
        code += "Q";
        code += project.getBasic().getCode();
        code += String.format("%02d", nextSeq);

        return code;
    }

    @Transactional(readOnly = true)
    public FileItem getFile(Long id) {
        ProjectCustomEstimate projectCustomEstimate = customEstimateRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(ProjectEstimate.KEY, id);
        });

        if(Objects.isNull(projectCustomEstimate.getFile())) {
            throw new FileSystemException(FileSystemExceptionType.NOT_FOUND);
        }

        return fileItemRepository.findById(projectCustomEstimate.getFile().getId()).orElseThrow(() -> {
            throw new NotFoundException(FileItem.KEY, projectCustomEstimate.getFile().getId());
        });
    }

    private void updateHistory(List<ProjectEstimate> list, ProjectEstimate instance, Boolean value) {
        ProjectEstimate prev = list.stream()
            .filter(c -> c.getId().equals(instance.getId()))
            .findFirst().orElse(null);
        if (Objects.isNull(prev)) {
            throw new NotFoundException(ProjectEstimate.KEY + ".is_empty", "???????????? ???????????? ???????????? ????????????.");
        }
        Boolean prevIsConfirmed = prev.getConfirmed();
        instance.changeConfirmed(value);

        if (instance.getConfirmed().equals(prevIsConfirmed)) {
            return;
        }

        eventPublisher.publishEvent(ProjectLogEvent.of(
            instance.getProject(),
            "?????? ?????? ??????",
            prevIsConfirmed ? "????????? ??????" : "????????? ?????????",
            instance.getConfirmed() ? "????????? ??????" : "????????? ?????????"
        ));
    }
}
