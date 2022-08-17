package com.howoocast.hywtl_has.project.service;

import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.parameter.ProjectBasicParameter;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project.view.ProjectShortView;
import com.howoocast.hywtl_has.project.view.ProjectView;
import com.howoocast.hywtl_has.user.service.UserFinder;
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

    private final ProjectRepository repository;

    private final ProjectFinder finder;

    private final UserFinder userFinder;

    @Transactional(readOnly = true)
    public Page<ProjectShortView> page(
        Predicate predicate,
        Pageable pageable
    ) {
        return repository.findAll(predicate, pageable)
            .map(ProjectShortView::assemble);
    }

    @Transactional(readOnly = true)
    public ProjectView getOne(Long id) {
        return ProjectView.assemble(finder.load(id));
    }

    @Transactional
    public ProjectView add(ProjectBasicParameter parameter) {
        Project instance = parameter.ofBuilder()
            .salesManager(userFinder.load(parameter.getSalesManagerId()))
            .projectManager(userFinder.load(parameter.getProjectManagerId()))
            .build();
        return ProjectView.assemble(repository.save(instance));
    }
}
