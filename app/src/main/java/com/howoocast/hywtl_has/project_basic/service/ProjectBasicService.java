package com.howoocast.hywtl_has.project_basic.service;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.domain.BusinessManager;
import com.howoocast.hywtl_has.business.repository.BusinessManagerRepository;
import com.howoocast.hywtl_has.business.repository.BusinessRepository;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.domain.ProjectEstimateExpectation;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicBusiness;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicDesign;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicFailReason;
import com.howoocast.hywtl_has.project_basic.parameter.ProjectBasicBusinessAddParameter;
import com.howoocast.hywtl_has.project_basic.parameter.ProjectBasicDesignParameter;
import com.howoocast.hywtl_has.project_basic.parameter.ProjectBasicFailReasonParameter;
import com.howoocast.hywtl_has.project_basic.repository.ProjectBasicBusinessRepository;
import com.howoocast.hywtl_has.project_basic.repository.ProjectBasicDesignRepository;
import com.howoocast.hywtl_has.project_basic.repository.ProjectBasicFailReasonRepository;
import java.util.List;
import java.util.Objects;
import javax.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    public @Nullable
    ProjectBasicFailReason getFailReason(Long projectId) {
        return projectBasicFailReasonRepository.findByProject_Id(projectId).orElse(null);
    }

    @Transactional
    public void pushBusiness(Long projectId, ProjectBasicBusinessAddParameter parameter) {
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
    }

    @Transactional
    public void updateDesign(Long projectId, ProjectBasicDesignParameter parameter) {
        ProjectBasicDesign instance = projectBasicDesignRepository.findByProject_Id(projectId)
            .orElseGet(() -> projectBasicDesignRepository.save(
                ProjectBasicDesign.of(
                    new CustomFinder<>(projectRepository, Project.class).byId(projectId)
                )));

        instance.update(
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

        instance.update(
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
        project.getStatus().setEstimateExpectation(ProjectEstimateExpectation.LOSE);
    }

    @Transactional
    public void deleteBusiness(Long projectBasicBusinessId) {
        projectBasicBusinessRepository.deleteById(projectBasicBusinessId);
    }

    private ProjectBasicBusiness loadBusiness(Long id) {
        return projectBasicBusinessRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(ProjectBasicBusiness.KEY, id);
        });
    }

}
