package com.howoocast.hywtl_has.project_estimate.view;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.howoocast.hywtl_has.file.view.FileItemView;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectCustomEstimate;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import java.util.Objects;
import lombok.Getter;

@Getter
public class ProjectCustomEstimateView extends ProjectEstimateView {

    private FileItemView file;
    @JsonUnwrapped
    private ProjectCustomEstimateExtensionView extensionView;

    public ProjectCustomEstimateView(
        ProjectEstimate source
    ) {
        super(source);
    }

    public static ProjectCustomEstimateView assemble(ProjectCustomEstimate source) {
        ProjectCustomEstimateView target = new ProjectCustomEstimateView(source);
        target.file = FileItemView.assemble(source.getFile());
        if (Objects.nonNull(source.getExtensionInput())) {
            target.extensionView = ProjectCustomEstimateExtensionView.assemble(
                source.getExtensionInput(),
                source.getSiteList(),
                source.getBuildingList()
            );
        }
        return target;
    }
}
