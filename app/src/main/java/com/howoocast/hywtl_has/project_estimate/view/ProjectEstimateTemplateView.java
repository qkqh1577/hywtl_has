package com.howoocast.hywtl_has.project_estimate.view;

import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateTemplate;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class ProjectEstimateTemplateView {

    private String title;
    private TestType testType;
    private List<ProjectEstimateTemplateDetailView> detailList;

    public static ProjectEstimateTemplateView assemble(ProjectEstimateTemplate source) {
        ProjectEstimateTemplateView target = new ProjectEstimateTemplateView();
        target.title = source.getTitle();
        target.testType = source.getTestType();
        target.detailList = source.getDetailList().stream()
            .map(ProjectEstimateTemplateDetailView::assemble)
            .collect(Collectors.toList());
        return target;
    }
}
