package com.howoocast.hywtl_has.project_basic.service;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.repository.BusinessRepository;
import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.domain.ProjectEstimateExpectation;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicFailReason;
import com.howoocast.hywtl_has.project_basic.parameter.ProjectBasicFailReasonAddParameter;
import com.howoocast.hywtl_has.project_basic.parameter.ProjectBasicFailReasonUpdateParameter;
import com.howoocast.hywtl_has.project_basic.repository.ProjectBasicFailReasonRepository;
import com.howoocast.hywtl_has.project_log.domain.ProjectLogEvent;
import java.util.List;
import javax.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectBasicFailReasonService {

    private final ProjectBasicFailReasonRepository repository;
    private final BusinessRepository businessRepository;

    private final ProjectRepository projectRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional(readOnly = true)
    @Nullable
    public ProjectBasicFailReason get(Long projectId) {
        return repository.findByProject_Id(projectId).orElse(null);
    }

    @Transactional
    public void add(
        Long projectId,
        ProjectBasicFailReasonAddParameter parameter
    ) {
        Project project = new CustomFinder<>(projectRepository, Project.class).byId(projectId);
        ProjectBasicFailReason instance = ProjectBasicFailReason.of(project);
        Business win = new CustomFinder<>(businessRepository, Business.class).byIdIfExists(parameter.getWinId());
        List<EventEntity> eventList = instance.update(
            win,
            parameter.getTestAmount(),
            parameter.getReviewAmount(),
            parameter.getTotalAmount(),
            parameter.getExpectedDuration(),
            parameter.getReason()
        );
        repository.save(instance);

        eventPublisher.publishEvent(ProjectLogEvent.of(
            project,
            "프로젝트 견적 분류 변경",
            project.getStatus().getEstimateExpectation().getName(),
            ProjectEstimateExpectation.LOSE.getName()
        ));
        project.getStatus().setEstimateExpectation(ProjectEstimateExpectation.LOSE);
        eventList.stream().map(event -> ProjectLogEvent.of(project, event)).forEach(eventPublisher::publishEvent);
    }

    @Transactional
    public void update(
        Long projectId,
        ProjectBasicFailReasonUpdateParameter parameter
    ) {
        Project project = new CustomFinder<>(projectRepository, Project.class).byId(projectId);
        ProjectBasicFailReason instance = repository.findByProject_Id(projectId)
            .orElseGet(() -> ProjectBasicFailReason.of(project));
        Business win = new CustomFinder<>(businessRepository, Business.class).byIdIfExists(parameter.getWinId());

        List<EventEntity> eventList = instance.update(
            win,
            parameter.getTestAmount(),
            parameter.getReviewAmount(),
            parameter.getTotalAmount(),
            parameter.getExpectedDuration(),
            parameter.getReason()
        );
        eventList.stream().map(event -> ProjectLogEvent.of(project, event)).forEach(eventPublisher::publishEvent);
    }
}
