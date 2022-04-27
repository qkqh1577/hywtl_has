package com.howoocast.hywtl_has.project.service;

import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.domain.ProjectBasic;
import com.howoocast.hywtl_has.project.parameter.ProjectBasicParameter;
import com.howoocast.hywtl_has.project.repository.ProjectBasicRepository;
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
    private final ProjectBasicRepository repository;

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public ProjectBasicView getOne(Long projectId) {
        return ProjectBasicView.assemble(ProjectBasic.load(repository, projectId));
    }

    @Transactional
    public void update(Long projectId, ProjectBasicParameter params) {
        ProjectBasic projectBasic = ProjectBasic.load(repository, projectId);
        projectBasic.change(
            params.getName(),
            params.getCode(),
            params.getAlias(),
            User.load(userRepository, params.getSalesManagerId()),
            User.load(userRepository, params.getProjectManagerId())
        );
        Project.load(projectRepository, projectId).change(projectBasic);
    }
}
