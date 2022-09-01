package com.howoocast.hywtl_has.project_basic.controller;

import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicBusiness;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicDesign;
import com.howoocast.hywtl_has.project_basic.view.ProjectBasicBusinessView;
import com.howoocast.hywtl_has.project_basic.view.ProjectBasicDesignView;
import java.util.List;
import java.util.stream.Collectors;

public class ProjectBasicMapper {

    public static List<ProjectBasicBusinessView> toBusinessView(List<ProjectBasicBusiness> source) {
        return source.stream().map(ProjectBasicBusinessView::assemble).collect(Collectors.toList());
    }

    public static ProjectBasicBusinessView toView(ProjectBasicBusiness source) {
        return ProjectBasicBusinessView.assemble(source);
    }

    public static ProjectBasicDesignView toView(ProjectBasicDesign source) {
        return ProjectBasicDesignView.assemble(source);
    }


}
