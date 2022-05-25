package com.howoocast.hywtl_has.project.service;

import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import org.springframework.stereotype.Service;

@Service
public class ProjectFinder extends CustomFinder<Project> {

    protected ProjectFinder(
        ProjectRepository repository
    ) {
        super("project", repository);
    }
}
