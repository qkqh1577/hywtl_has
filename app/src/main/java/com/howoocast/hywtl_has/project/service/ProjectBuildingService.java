package com.howoocast.hywtl_has.project.service;

import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.domain.ProjectBuilding;
import com.howoocast.hywtl_has.project.parameter.ProjectBuildingParameter;
import com.howoocast.hywtl_has.project.repository.ProjectBuildingRepository;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project.view.ProjectBuildingView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectBuildingService {

    private final ProjectRepository projectRepository;
    private final ProjectBuildingRepository repository;

    @Transactional(readOnly = true)
    public ProjectBuildingView getOne(Long projectId) {
        return ProjectBuildingView.assemble(
            ProjectBuilding.load(repository, projectId)
        );
    }

    @Transactional
    public void update(Long projectId, ProjectBuildingParameter params) {
        ProjectBuilding projectBuilding = ProjectBuilding.load(repository, projectId);
        projectBuilding.change(
            params.getAddress(),
            params.getPurpose1(),
            params.getPurpose2(),
            params.getLotArea(),
            params.getTotalArea(),
            params.getBuildingCount(),
            params.getHouseholdCount(),
            params.getFloorCount(),
            params.getBaseCount()
        );
        Project.load(projectRepository, projectId).change(projectBuilding);
    }
}
