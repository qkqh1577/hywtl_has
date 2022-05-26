package com.howoocast.hywtl_has.project.view;

import com.howoocast.hywtl_has.project.common.ProjectStatus;
import com.howoocast.hywtl_has.project.domain.Project;
import lombok.Getter;

@Getter
public class ProjectShortView {

    private Long id;
    private String code;
    private String name;
    private ProjectStatus status;

    public static ProjectShortView assemble(Project source) {
        ProjectShortView target = new ProjectShortView();
        target.id = source.getId();
        target.code = source.getBasic().getCode();
        target.name = source.getBasic().getName();
        target.status = source.getBasic().getStatus();
        return target;
    }
}
