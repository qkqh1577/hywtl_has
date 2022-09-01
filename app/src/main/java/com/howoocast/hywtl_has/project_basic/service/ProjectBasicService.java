package com.howoocast.hywtl_has.project_basic.service;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.domain.BusinessManager;
import com.howoocast.hywtl_has.business.repository.BusinessManagerRepository;
import com.howoocast.hywtl_has.business.repository.BusinessRepository;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicBusiness;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicDesign;
import com.howoocast.hywtl_has.project_basic.parameter.ProjectBasicBusinessAddParameter;
import com.howoocast.hywtl_has.project_basic.repository.ProjectBasicBusinessRepository;
import com.howoocast.hywtl_has.project_basic.repository.ProjectBasicDesignRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectBasicService {

    private final ProjectRepository projectRepository;

    private final ProjectBasicBusinessRepository projectBasicBusinessRepository;

    private final BusinessRepository businessRepository;

    private final BusinessManagerRepository businessManagerRepository;

    private final ProjectBasicDesignRepository projectBasicDesignRepository;


    @Transactional(readOnly = true)
    public List<ProjectBasicBusiness> getBusinessList(Long projectId) {
        return projectBasicBusinessRepository.findByProject_Id(projectId);
    }

    @Transactional(readOnly = true)
    public ProjectBasicDesign getDesign(Long id) {
        return loadDesign(id);
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
    public void deleteBusiness(Long projectBasicBusinessId) {
        projectBasicBusinessRepository.deleteById(projectBasicBusinessId);
    }

    private ProjectBasicBusiness loadBusiness(Long id) {
        return projectBasicBusinessRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(ProjectBasicBusiness.KEY, id);
        });
    }


    private ProjectBasicDesign loadDesign(Long id) {
        return projectBasicDesignRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(ProjectBasicDesign.KEY, id);
        });
    }
}
