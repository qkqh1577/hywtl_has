package com.howoocast.hywtl_has.project.repository;

import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.parameter.ProjectSearchParameter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProjectSearchRepository {
    Page<Project> search(ProjectSearchParameter parameter, Pageable pageable);
}
