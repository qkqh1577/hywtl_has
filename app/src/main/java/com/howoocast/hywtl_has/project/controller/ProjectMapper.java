package com.howoocast.hywtl_has.project.controller;

import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.view.ProjectShortView;
import com.howoocast.hywtl_has.project.view.ProjectView;
import java.util.List;
import java.util.stream.Collectors;

public final class ProjectMapper {

    public static List<ProjectShortView> toShortView(List<Project> list) {
        return list.stream().map(ProjectShortView::assemble).collect(Collectors.toList());
    }

    public static ProjectView toView(Project instance) {
        return ProjectView.assemble(instance);
    }
}
