package com.howoocast.hywtl_has.project_complex.controller;

import com.howoocast.hywtl_has.project_complex.domain.ProjectComplexBuilding;
import com.howoocast.hywtl_has.project_complex.domain.ProjectComplexSite;
import com.howoocast.hywtl_has.project_complex.view.ProjectComplexBuildingView;
import com.howoocast.hywtl_has.project_complex.view.ProjectComplexSiteView;
import java.util.List;
import java.util.stream.Collectors;

public class ProjectComplexMapper {


    public static List<ProjectComplexSiteView> toSite(
        List<ProjectComplexSite> source
    ) {
        return source.stream().map(ProjectComplexSiteView::assemble).collect(Collectors.toList());
    }

    public static List<ProjectComplexBuildingView> toBuilding (
        List<ProjectComplexBuilding> source
    ) {
        return source.stream().map(ProjectComplexBuildingView::assemble).collect(Collectors.toList());
    }
}
