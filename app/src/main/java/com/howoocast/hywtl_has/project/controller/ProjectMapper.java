package com.howoocast.hywtl_has.project.controller;

import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.view.ProjectShortView;
import com.howoocast.hywtl_has.project.view.ProjectView;
import org.springframework.data.domain.Page;

public final class ProjectMapper {

    public static Page<ProjectShortView> toShortView(Page<Project> page) {
        return page.map(ProjectShortView::assemble);
    }

    public static ProjectView toView(Project instance) {
        return ProjectView.assemble(instance);
    }
}
