package com.howoocast.hywtl_has.project_estimate.service;

import com.howoocast.hywtl_has.business.repository.BusinessRepository;
import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectFinalEstimate;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectFinalEstimateParameter;
import com.howoocast.hywtl_has.project_estimate.repository.ProjectFinalEstimateRepository;
import com.howoocast.hywtl_has.project_log.domain.ProjectLogEvent;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProjectFinalEstimateService {

    private final ProjectFinalEstimateRepository repository;
    private final ProjectRepository projectRepository;
    private final BusinessRepository businessRepository;
    private final UserRepository userRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    public ProjectFinalEstimate getFinalEstimate(Long projectId) {
        return repository.findByProject_Id(projectId).orElse(ProjectFinalEstimate.of(
            new CustomFinder<>(projectRepository, Project.class).byId(projectId)
        ));
    }

    @Transactional
    public void updateFinalEstimate(Long projectId, ProjectFinalEstimateParameter parameter) {
        Project project = new CustomFinder<>(projectRepository, Project.class).byId(projectId);
        ProjectFinalEstimate instance = repository.findByProject_Id(projectId)
            .orElseGet(() -> ProjectFinalEstimate.of(project));

        List<EventEntity> eventList = instance.update(
            parameter.getEstimateDate(),
            parameter.getCode(),
            parameter.getTargetTest(),
            parameter.getTestAmount(),
            parameter.getReviewAmount(),
            parameter.getTotalAmount(),
            parameter.getType(),
            Objects.nonNull(parameter.getBusinessId())
                ? businessRepository.findById(parameter.getBusinessId())
                .orElse(null) : null,
            Objects.nonNull(parameter.getWriterId())
                ? userRepository.findById(parameter.getWriterId()).orElse(null)
                : null,
            parameter.getIsSent(),
            parameter.getNote()
        );
        if(Objects.isNull(instance.getId())) {
            repository.save(instance);
        }
        eventList.stream().map(event -> ProjectLogEvent.of(project, event)).forEach(eventPublisher::publishEvent);
    }
}
