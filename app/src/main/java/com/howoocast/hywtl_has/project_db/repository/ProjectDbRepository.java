package com.howoocast.hywtl_has.project_db.repository;

import com.howoocast.hywtl_has.project_db.configuration.ProjectDbInformationSchema;
import com.howoocast.hywtl_has.project_db.parameter.ProjectDbParameter;
import com.howoocast.hywtl_has.project_db.view.ProjectDbView;

import java.util.List;

public interface ProjectDbRepository {
    List<ProjectDbView> findAll(ProjectDbParameter parameter, ProjectDbInformationSchema schema) throws ClassNotFoundException;
}
