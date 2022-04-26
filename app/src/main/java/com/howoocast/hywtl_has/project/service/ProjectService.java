package com.howoocast.hywtl_has.project.service;

import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.domain.ProjectBasic;
import com.howoocast.hywtl_has.project.parameter.ProjectAddParameter;
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
    public ProjectView add(ProjectAddParameter parameter) {
        Project project = Project.of(
            projectRepository,
            ProjectBasic.of(
                parameter.getBasic().getName(),
                parameter.getBasic().getAlias(),
                parameter.getBasic().getStatus(),
                User.load(userRepository, parameter.getBasic().getSalesManagerId()),
                User.load(userRepository, parameter.getBasic().getProjectManagerId())
            )
        );
        project.save();
        return ProjectView.assemble(project);
    }
}
