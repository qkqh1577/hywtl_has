package com.howoocast.hywtl_has.project.view;

import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.domain.ProjectProgressStatus;
import lombok.Getter;

@Getter
public class ProjectShortView {

    private Long id;
    private String code;
    private String name;
    private ProjectProgressStatus progressStatus;
    private Boolean isFavorite;

    public static ProjectShortView assemble(Project source) {
        ProjectShortView target = new ProjectShortView();
        target.id = source.getId();
        target.code = source.getBasic().getCode();
        target.name = source.getBasic().getName();
        target.isFavorite = source.getIsFavorite();
        target.progressStatus = source.getStatus().getProgressStatus();
        return target;
    }
}
