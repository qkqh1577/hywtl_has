package com.howoocast.hywtl_has.project_db.repository;

import com.howoocast.hywtl_has.project_db.parameter.ProjectDbParameter;
import com.howoocast.hywtl_has.project_db.view.ProjectDbView;

import java.util.List;

public interface ProjectDbRepository {
    List<ProjectDbView> findByDynamicJoin(ProjectDbParameter parameter);
}
