package com.howoocast.hywtl_has.project.view;

import com.howoocast.hywtl_has.project.domain.Project;
import lombok.Getter;

@Getter
public class ProjectView {

    private Long id;
    private ProjectBasicView basic;

    public static ProjectView assemble(Project source) {
        ProjectView target = new ProjectView();
        target.id = source.getId();
        target.basic = ProjectBasicView.assemble(source.getBasic());

        return target;
    }
}
