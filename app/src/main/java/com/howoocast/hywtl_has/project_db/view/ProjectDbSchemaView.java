package com.howoocast.hywtl_has.project_db.view;

import com.howoocast.hywtl_has.project_db.configuration.ProjectDbInformationSchema;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@Getter
public class ProjectDbSchemaView {
    private Map<String, ProjectDbInformationSchema.InformationSchema> entities;

    public static ProjectDbSchemaView assemble(ProjectDbInformationSchema schema) {
        ProjectDbSchemaView view = new ProjectDbSchemaView();
        view.entities = schema.getEntities();
        return view;
    }
}
