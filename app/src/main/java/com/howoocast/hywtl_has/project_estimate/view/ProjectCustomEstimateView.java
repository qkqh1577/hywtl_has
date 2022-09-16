package com.howoocast.hywtl_has.project_estimate.view;

import com.howoocast.hywtl_has.business.view.BusinessShortView;
import com.howoocast.hywtl_has.file.view.FileItemView;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectCustomEstimate;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import lombok.Getter;

@Getter
public class ProjectCustomEstimateView extends ProjectEstimateView {

    private FileItemView file;

    private BusinessShortView business;

    public ProjectCustomEstimateView(
        ProjectEstimate source
    ) {
        super(source);
    }

    public static ProjectCustomEstimateView assemble(ProjectCustomEstimate source) {
        ProjectCustomEstimateView target = new ProjectCustomEstimateView(source);
        target.file = FileItemView.assemble(source.getFile());
        target.business = BusinessShortView.assemble(source.getBusiness());
        return target;
    }
}
