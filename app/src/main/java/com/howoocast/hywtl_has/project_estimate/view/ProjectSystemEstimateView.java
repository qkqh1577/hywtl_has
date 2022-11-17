package com.howoocast.hywtl_has.project_estimate.view;

import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectSystemEstimate;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectSystemEstimateParameter.Content;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class ProjectSystemEstimateView extends ProjectEstimateView {

    private List<ProjectEstimateTemplateView> templateList;
    private List<String> contentList;

    public ProjectSystemEstimateView(ProjectEstimate source) {
        super(source);
    }

    public static ProjectSystemEstimateView assemble(ProjectSystemEstimate source) {
        ProjectSystemEstimateView target = new ProjectSystemEstimateView(source);
        target.templateList = source.getTemplateList().stream()
            .map(ProjectEstimateTemplateView::assemble)
            .collect(Collectors.toList());
        target.contentList = source.getContentList();
        return target;
    }

    public static ProjectSystemEstimateView assemble(ProjectSystemEstimate source, List<Content> contentList) {
        ProjectSystemEstimateView target = new ProjectSystemEstimateView(source);
        target.templateList = source.getTemplateList().stream()
            .map(ProjectEstimateTemplateView::assemble)
            .collect(Collectors.toList());
        target.contentList = contentList.stream().map(Content::getContent).collect(Collectors.toList());
        return target;
    }
}
