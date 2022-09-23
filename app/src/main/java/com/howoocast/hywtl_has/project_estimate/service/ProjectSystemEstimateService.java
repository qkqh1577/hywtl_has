package com.howoocast.hywtl_has.project_estimate.service;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.repository.BusinessRepository;
import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateTemplate;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateTemplateDetail;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateType;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectSystemEstimate;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectEstimateTemplateParameter;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectSystemEstimateParameter;
import com.howoocast.hywtl_has.project_estimate.repository.ProjectSystemEstimateRepository;
import com.howoocast.hywtl_has.project_log.domain.ProjectLogEvent;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectSystemEstimateService {

    private final ProjectSystemEstimateRepository repository;

    private final ProjectEstimateService estimateService;

    private final BusinessRepository businessRepository;

    private final ApplicationEventPublisher eventPublisher;

    @Transactional(readOnly = true)
    public ProjectSystemEstimate get(Long id) {
        return this.load(id);
    }

    @Transactional
    public void add(
        Long projectId,
        String username,
        ProjectSystemEstimateParameter parameter
    ) {
        ProjectSystemEstimate instance = ProjectSystemEstimate.of(
            estimateService.of(projectId, username),
            parameter.getIsSent(),
            parameter.getRecipient(),
            parameter.getNote(),
            toTemplateList(parameter.getTemplateList()),
            parameter.getContentList(),
            new CustomFinder<>(businessRepository, Business.class).byId(1L));
        estimateService.changePlan(instance, parameter.getPlan());
        estimateService.changeSiteList(instance, parameter.getSiteList());
        estimateService.changeBuildingList(instance, parameter.getBuildingList());
        repository.save(instance);
        eventPublisher.publishEvent(ProjectLogEvent.of(
            instance.getProject(),
            String.format("%s 등록", ProjectEstimateType.SYSTEM.getName()),
            null,
            instance.getCode()
        ));
    }

    @Transactional
    public void change(Long id, ProjectSystemEstimateParameter parameter) {
        ProjectSystemEstimate instance = this.load(id);
        List<EventEntity> eventList = instance.change(
            parameter.getIsSent(),
            parameter.getRecipient(),
            parameter.getNote(),
            toTemplateList(parameter.getTemplateList()),
            parameter.getContentList()
        );
        eventList.stream().map(event -> ProjectLogEvent.of(instance.getProject(), event))
            .forEach(eventPublisher::publishEvent);
        estimateService.changePlan(instance, parameter.getPlan());
        estimateService.changeSiteList(instance, parameter.getSiteList());
        estimateService.changeBuildingList(instance, parameter.getBuildingList());
    }

    private List<ProjectEstimateTemplate> toTemplateList(List<ProjectEstimateTemplateParameter> templateList) {
        return templateList.stream()
            .map(template -> ProjectEstimateTemplate.of(
                template.getTitle(),
                template.getTestType(),
                template.getDetailList().stream()
                    .map(templateDetail -> ProjectEstimateTemplateDetail.of(
                        templateDetail.getTitleList(),
                        templateDetail.getUnit(),
                        templateDetail.getTestCount(),
                        templateDetail.getUnitAmount(),
                        templateDetail.getTotalAmount(),
                        templateDetail.getInUse(),
                        templateDetail.getNote()))
                    .collect(Collectors.toList())))
            .collect(Collectors.toList());
    }

    private ProjectSystemEstimate load(Long id) {
        return repository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(ProjectSystemEstimate.KEY, id);
        });
    }
}
