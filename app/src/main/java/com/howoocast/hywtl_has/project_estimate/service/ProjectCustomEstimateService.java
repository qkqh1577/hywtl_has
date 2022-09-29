package com.howoocast.hywtl_has.project_estimate.service;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.repository.BusinessRepository;
import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.file.domain.FileItem;
import com.howoocast.hywtl_has.file.service.FileItemService;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectCustomEstimate;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectCustomEstimateAddParameter;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectCustomEstimateChangeParameter;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectCustomEstimateExtensionParameter;
import com.howoocast.hywtl_has.project_estimate.repository.ProjectCustomEstimateRepository;
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
public class ProjectCustomEstimateService {

    private final ProjectCustomEstimateRepository repository;

    private final BusinessRepository businessRepository;

    private final FileItemService fileItemService;

    private final ProjectEstimateService estimateService;

    private final ApplicationEventPublisher eventPublisher;

    @Transactional(readOnly = true)
    public ProjectCustomEstimate get(Long id) {
        return repository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(ProjectCustomEstimate.KEY, id);
        });
    }

    @Transactional
    public void add(
        Long projectId,
        String username,
        ProjectCustomEstimateAddParameter parameter
    ) {
        Business business = new CustomFinder<>(businessRepository, Business.class).byId(parameter.getBusinessId());
        FileItem file = Objects.requireNonNull(fileItemService.build(parameter.getFile()));

        ProjectCustomEstimate instance = ProjectCustomEstimate.of(
            estimateService.of(projectId, username),
            file,
            parameter.getType(),
            parameter.getIsSent(),
            parameter.getRecipient(),
            parameter.getIsLh(),
            parameter.getNote(),
            business
        );
        repository.save(instance);
        eventPublisher.publishEvent(ProjectLogEvent.of(
            instance.getProject(),
            String.format("%s 등록", parameter.getType().getName()),
            null,
            instance.getCode()
        ));
    }

    @Transactional
    public void change(
        Long id,
        ProjectCustomEstimateChangeParameter parameter
    ) {
        ProjectCustomEstimate instance = this.load(id);
        Business business = new CustomFinder<>(businessRepository, Business.class).byId(parameter.getBusinessId());

        List<EventEntity> eventList = instance.change(
            parameter.getIsSent(),
            parameter.getRecipient(),
            parameter.getIsLh(),
            parameter.getNote(),
            business
        );
        eventList.stream().map(event -> ProjectLogEvent.of(instance.getProject(), event))
            .forEach(eventPublisher::publishEvent);
    }

    @Transactional
    public void extend(
        Long id,
        ProjectCustomEstimateExtensionParameter parameter
    ) {
        ProjectCustomEstimate instance = this.load(id);
        estimateService.changePlan(instance, parameter.getPlan());
        estimateService.changeSiteList(instance, parameter.getSiteList());
        estimateService.changeBuildingList(instance, parameter.getBuildingList());
    }

    private ProjectCustomEstimate load(Long id) {
        return repository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(ProjectCustomEstimate.KEY, id);
        });
    }
}
