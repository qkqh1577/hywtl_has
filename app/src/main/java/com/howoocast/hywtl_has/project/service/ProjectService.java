package com.howoocast.hywtl_has.project.service;

import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.domain.ProjectBasic;
import com.howoocast.hywtl_has.project.parameter.ProjectBasicParameter;
import com.howoocast.hywtl_has.project.repository.ProjectBasicRepository;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project.view.ProjectListView;
import com.howoocast.hywtl_has.project.view.ProjectView;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import com.querydsl.core.types.Predicate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    private final ProjectBasicRepository projectBasicRepository;

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<ProjectListView> page(
        Predicate predicate,
        Pageable pageable
    ) {
        return projectRepository.findAll(predicate, pageable)
            .map(ProjectListView::assemble);
    }

    @Transactional(readOnly = true)
    public ProjectView getOne(Long id) {
        return ProjectView.assemble(Project.load(projectRepository, id));
    }

    @Transactional
    public ProjectView add(ProjectBasicParameter params) {
        ProjectBasic basic = ProjectBasic.of(
            projectBasicRepository,
            params.getName(),
            params.getCode(),
            params.getAlias(),
            User.load(userRepository, params.getSalesManagerId()),
            User.load(userRepository, params.getProjectManagerId())
        );
        Project project = Project.of(
            projectRepository,
            basic
        );
        return ProjectView.assemble(project);
    }
}
