package com.howoocast.hywtl_has.project_estimate.service;

import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.common.exception.IllegalRequestException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_document.domain.ProjectDocument;
import com.howoocast.hywtl_has.project_document.repository.ProjectDocumentRepository;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateComplexBuilding;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateComplexSite;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimatePlan;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectEstimateComplexBuildingParameter;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectEstimateComplexSiteParameter;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectEstimatePlanParameter;
import com.howoocast.hywtl_has.project_estimate.repository.ProjectEstimateRepository;
import com.howoocast.hywtl_has.project_log.domain.ProjectLogEvent;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
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
    public ProjectEstimate getFinal(
        Long projectId
    ) {
        return repository.findByProject_IdAndConfirmed(projectId, Boolean.TRUE)
            .orElse(null);
    }

    @Transactional
    public void confirm(Long projectId, Long estimateId) {
        List<ProjectEstimate> estimateList = repository.findByProject_Id(projectId);
        ProjectEstimate instance = repository.findById(estimateId).orElseThrow(() -> {
            throw new NotFoundException(ProjectEstimate.KEY, estimateId);
        });

        if (estimateList.isEmpty()) {
            throw new IllegalRequestException(ProjectEstimate.KEY + ".is_empty", "선택할 수 있는 견적서가 없습니다.");
        }
        if (instance.getConfirmed()) {
            throw new IllegalRequestException(ProjectEstimate.KEY + ".already_confirmed", "이미 확정된 견적서입니다.");
        }
        // 이전 삭제
        ProjectEstimate prev = estimateList.stream()
            .filter(ProjectEstimate::getConfirmed)
            .findFirst().orElse(null);
        if (Objects.nonNull(prev)) {
            prev.changeConfirmed(Boolean.FALSE);
        }

        // 현재 등록
        instance.changeConfirmed(Boolean.TRUE);
        eventPublisher.publishEvent(ProjectLogEvent.of(
            instance.getProject(),
            "확정 여부 변경",
            Optional.ofNullable(prev).map(ProjectEstimate::getCode).orElse(null),
            instance.getCode()
        ));
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
                    plan.getIsLh()))
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
}
