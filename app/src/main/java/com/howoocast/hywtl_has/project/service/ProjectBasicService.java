package com.howoocast.hywtl_has.project.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
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

    private final ProjectRepository repository;

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public ProjectBasicView getOne(Long projectId) {
        Project instance = this.load(projectId);
        return ProjectBasicView.assemble(instance.getBasic());
    }

    @Transactional
    public void update(Long projectId, ProjectBasicParameter params) {
        Project instance = this.load(projectId);
        instance.changeBasic(
            params.getName(),
            params.getCode(),
            params.getAlias(),
            this.loadUser(params.getSalesManagerId()),
            this.loadUser(params.getProjectManagerId()),
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
        Project instance = this.load(projectId);
        instance.changeStatus(params.getStatus());
    }

    private Project load(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("project", id));
    }

    private User loadUser(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new NotFoundException("user", id));
    }
}
