package com.howoocast.hywtl_has.project.service;

import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.parameter.ProjectBasicParameter;
import com.howoocast.hywtl_has.project.parameter.ProjectStatusParameter;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project.view.ProjectBasicView;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectBasicService {

    private final ProjectRepository projectRepository;

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public ProjectBasicView getOne(Long projectId) {
        return ProjectBasicView.assemble(Project.load(projectRepository, projectId).getBasic());
    }

    @Transactional
    public void update(Long projectId, ProjectBasicParameter params) {
        Project.load(projectRepository, projectId)
            .changeBasic(
                params.getName(),
                params.getCode(),
                params.getAlias(),
                User.load(userRepository, params.getSalesManagerId()),
                User.load(userRepository, params.getProjectManagerId()),
                params.getAddress(),
                params.getPurpose1(),
                params.getPurpose2(),
                params.getLotArea(),
                params.getTotalArea(),
                params.getBuildingCount(),
                params.getHouseholdCount(),
                params.getFloorCount(),
                params.getBaseCount(),
                params.getClientName(),
                params.getIsClientLH(),
                params.getClientManager(),
                params.getClientPhone(),
                params.getClientEmail()
            );
    }

    @Transactional
    public void update(Long projectId, ProjectStatusParameter params) {
        Project.load(projectRepository, projectId)
            .changeStatus(params.getStatus());
    }
}
