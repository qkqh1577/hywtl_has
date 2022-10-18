package com.howoocast.hywtl_has.project_basic.service;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.domain.BusinessManager;
import com.howoocast.hywtl_has.business.repository.BusinessManagerRepository;
import com.howoocast.hywtl_has.business.repository.BusinessRepository;
import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.domain.ProjectEstimateExpectation;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicBusiness;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicDesign;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicFailReason;
import com.howoocast.hywtl_has.project_basic.parameter.ProjectBasicBusinessParameter;
import com.howoocast.hywtl_has.project_basic.parameter.ProjectBasicDesignParameter;
import com.howoocast.hywtl_has.project_basic.parameter.ProjectBasicFailReasonParameter;
import com.howoocast.hywtl_has.project_basic.repository.ProjectBasicBusinessRepository;
import com.howoocast.hywtl_has.project_basic.repository.ProjectBasicDesignRepository;
import com.howoocast.hywtl_has.project_basic.repository.ProjectBasicFailReasonRepository;
import com.howoocast.hywtl_has.project_log.domain.ProjectLogEvent;
import java.util.List;
import java.util.Objects;
import javax.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectBasicService {

    private final BusinessManagerRepository businessManagerRepository;
    private final BusinessRepository businessRepository;
    private final ProjectBasicBusinessRepository projectBasicBusinessRepository;
    private final ProjectBasicDesignRepository projectBasicDesignRepository;
    private final ProjectBasicFailReasonRepository projectBasicFailReasonRepository;
    private final ProjectRepository projectRepository;
    private final ApplicationEventPublisher eventPublisher;


    @Transactional(readOnly = true)
    public List<ProjectBasicBusiness> getBusinessList(Long projectId) {
        return projectBasicBusinessRepository.findByProject_Id(projectId);
    }

    @Transactional(readOnly = true)
    public ProjectBasicBusiness getBusiness(Long id) {
        return loadBusiness(id);
    }

    @Transactional(readOnly = true)
    public ProjectBasicDesign getDesign(Long id) {
        return projectBasicDesignRepository.findByProject_Id(id).orElse(ProjectBasicDesign.of(
            new CustomFinder<>(projectRepository, Project.class).byId(id)
        ));
    }

    @Transactional(readOnly = true)
    @Nullable
    public ProjectBasicFailReason getFailReason(Long projectId) {
        return projectBasicFailReasonRepository.findByProject_Id(projectId).orElse(null);
    }

    @Transactional
    public void addBusiness(Long projectId, ProjectBasicBusinessParameter parameter) {
        Project project = new CustomFinder<>(projectRepository, Project.class).byId(projectId);
        Business business = new CustomFinder<>(businessRepository, Business.class).byId(parameter.getBusinessId());
        BusinessManager businessManager = new CustomFinder<>(businessManagerRepository, BusinessManager.class).byId(
            parameter.getBusinessManagerId());

        ProjectBasicBusiness instance = ProjectBasicBusiness.of(
            parameter.getInvolvedType(),
            project,
            business,
            businessManager
        );
        projectBasicBusinessRepository.save(instance);
        eventPublisher.publishEvent(ProjectLogEvent.of(
            project,
            "관계사 행 추가"
        ));
    }

    @Transactional
    public void changeBusiness(Long id, ProjectBasicBusinessParameter parameter) {
        ProjectBasicBusiness instance = this.loadBusiness(id);
        Business business = new CustomFinder<>(businessRepository, Business.class).byId(parameter.getBusinessId());
        BusinessManager businessManager = new CustomFinder<>(businessManagerRepository, BusinessManager.class).byId(
            parameter.getBusinessManagerId());

        List<EventEntity> eventList = instance.change(
            parameter.getInvolvedType(),
            business,
            businessManager
        );
        eventList.stream().map(event -> ProjectLogEvent.of(instance.getProject(), event))
            .forEach(eventPublisher::publishEvent);
    }

    @Transactional
    public void updateDesign(Long projectId, ProjectBasicDesignParameter parameter) {
        Project project = new CustomFinder<>(projectRepository, Project.class).byId(projectId);
        ProjectBasicDesign instance = projectBasicDesignRepository.findByProject_Id(projectId)
            .orElseGet(() -> ProjectBasicDesign.of(project));

        List<EventEntity> eventList = instance.update(
            parameter.getCity(),
            parameter.getAddress(),
            parameter.getComplexCount(),
            parameter.getPurpose1(),
            parameter.getPurpose2(),
            parameter.getLotArea(),
            parameter.getTotalArea(),
            parameter.getTotalBuildingCount(),
            parameter.getHouseholdCount(),
            parameter.getMaximumFloor(),
            parameter.getMaximumHeight()
        );
        if (Objects.isNull(instance.getId())) {
            projectBasicDesignRepository.save(instance);
        }
        eventList.stream().map(event -> ProjectLogEvent.of(project, event)).forEach(eventPublisher::publishEvent);
    }

    @Transactional
    public void upsertFailReason(
        Long projectId,
        ProjectBasicFailReasonParameter parameter
    ) {
        Project project = new CustomFinder<>(projectRepository, Project.class).byId(projectId);
        ProjectBasicFailReason instance = projectBasicFailReasonRepository.findByProject_Id(projectId)
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
        if (Objects.isNull(instance.getId())) {
            projectBasicFailReasonRepository.save(instance);
        }
        eventList.stream().map(event -> ProjectLogEvent.of(project, event)).forEach(eventPublisher::publishEvent);

        eventPublisher.publishEvent(ProjectLogEvent.of(
            project,
            "프로젝트 견적 분류 변경",
            project.getStatus().getEstimateExpectation().getName(),
            ProjectEstimateExpectation.LOSE.getName()
        ));
        project.getStatus().setEstimateExpectation(ProjectEstimateExpectation.LOSE);
    }

    @Transactional
    public void deleteBusiness(Long projectBasicBusinessId) {
        ProjectBasicBusiness instance = this.loadBusiness(projectBasicBusinessId);
        eventPublisher.publishEvent(ProjectLogEvent.of(
            instance.getProject(),
            "프로젝트 관계사 삭제",
            String.format("%s: %s", instance.getInvolvedType().getName(), instance.getBusiness().getName()),
            null
        ));
        instance.delete();
    }

    private ProjectBasicBusiness loadBusiness(Long id) {
        return projectBasicBusinessRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(ProjectBasicBusiness.KEY, id);
        });
    }

}
