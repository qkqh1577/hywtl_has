package com.howoocast.hywtl_has.project.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public final class ProjectFinder {

    private final ProjectRepository repository;

    public Project byId(Long id) {
        return repository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(Project.KEY, id);
        });
    }
}
