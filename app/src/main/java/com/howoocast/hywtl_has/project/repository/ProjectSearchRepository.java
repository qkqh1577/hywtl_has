package com.howoocast.hywtl_has.project.repository;

import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.parameter.ProjectSearchParameter;
import java.util.List;

public interface ProjectSearchRepository {
    List<Project> search(ProjectSearchParameter parameter);
}
