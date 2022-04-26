package com.howoocast.hywtl_has.project.view;

import com.howoocast.hywtl_has.project.common.ProjectStatus;
import com.howoocast.hywtl_has.project.domain.Project;
import lombok.Getter;

@Getter
public class ProjectListView {

    private Long id;
    private String code;
    private String name;
    private ProjectStatus status;

    public static ProjectListView assemble(Project source) {
        ProjectListView target = new ProjectListView();
        target.id = source.getId();
        target.code = source.getBasic().getCode();
        target.name = source.getBasic().getName();
        target.status = source.getBasic().getStatus();
        return target;
    }
}
