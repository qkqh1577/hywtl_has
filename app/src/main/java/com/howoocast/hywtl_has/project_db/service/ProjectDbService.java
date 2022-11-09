package com.howoocast.hywtl_has.project_db.service;


import com.howoocast.hywtl_has.project_db.configuration.ProjectDbInformationSchema;
import com.howoocast.hywtl_has.project_db.parameter.ProjectDbParameter;
import com.howoocast.hywtl_has.project_db.repository.ProjectDbRepository;
import com.howoocast.hywtl_has.project_db.view.ProjectDbSchemaView;
import com.howoocast.hywtl_has.project_db.view.ProjectDbView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectDbService {

    private final ProjectDbRepository projectDbRepository;
    private final ProjectDbInformationSchema schema;

    @Transactional(readOnly = true)
    public List<ProjectDbView> list(ProjectDbParameter projectDbParameter) throws ClassNotFoundException{
        return projectDbRepository.findAll(projectDbParameter, schema);
    }

    public ProjectDbSchemaView getInformationSchema() {
        return ProjectDbSchemaView.assemble(schema);
    }

}
