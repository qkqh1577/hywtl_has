package com.howoocast.hywtl_has.project_estimate.controller;

import com.howoocast.hywtl_has.project_estimate.domain.ProjectCustomEstimate;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import com.howoocast.hywtl_has.project_estimate.view.ProjectCustomEstimateView;
import com.howoocast.hywtl_has.project_estimate.view.ProjectEstimateShortView;
import com.howoocast.hywtl_has.project_estimate.view.ProjectEstimateView;
import java.util.List;
import java.util.stream.Collectors;

public class ProjectEstimateMapper {

    public static List<ProjectEstimateShortView> toShortView(List<ProjectEstimate> source) {
        return source.stream().map(ProjectEstimateShortView::assemble).collect(Collectors.toList());
    }

    public static ProjectEstimateView toView(ProjectCustomEstimate source) {
        return ProjectCustomEstimateView.assemble(source);
    }
}
