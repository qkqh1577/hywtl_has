package com.howoocast.hywtl_has.project_bid.service;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.repository.BusinessRepository;
import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_bid.domain.ProjectBid;
import com.howoocast.hywtl_has.project_bid.parameter.ProjectBidParameter;
import com.howoocast.hywtl_has.project_bid.repository.ProjectBidRepository;
import com.howoocast.hywtl_has.project_log.domain.ProjectLogEvent;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectBidService {

    private final ProjectBidRepository repository;

    private final ProjectRepository projectRepository;

    private final BusinessRepository businessRepository;

    private final ApplicationEventPublisher eventPublisher;

    @Transactional(readOnly = true)
    public ProjectBid get(Long projectId) {
        return this.load(projectId);
    }

    @Transactional
    public void upsert(
        Long projectId,
        ProjectBidParameter parameter
    ) {
        ProjectBid instance = this.load(projectId);
        Business win = new CustomFinder<>(businessRepository, Business.class).byIdIfExists(parameter.getWinId());
        List<EventEntity> eventList = instance.update(
            parameter.getBeginDate(),
            parameter.getCloseDate(),
            win,
            parameter.getBidOrganization(),
            parameter.getBidDate(),
            parameter.getTestAmount(),
            parameter.getReviewAmount(),
            parameter.getTotalAmount(),
            parameter.getExpectedDuration()
        );
        if (Objects.isNull(instance.getId())) {
            repository.save(instance);
        }
        eventList.stream().map(event -> ProjectLogEvent.of(instance.getProject(), event))
            .forEach(eventPublisher::publishEvent);
    }

    private ProjectBid load(Long projectId) {
        return repository.findByProject_Id(projectId).orElseGet(() -> {
            Project project = new CustomFinder<>(projectRepository, Project.class).byId(projectId);
            return ProjectBid.of(project);
        });
    }

}
