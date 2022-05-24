package com.howoocast.hywtl_has.project_estimate.view;

import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateSheetTestService;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class ProjectEstimateSheetTestServiceView {

    private Long id;

    private String title;

    private List<ProjectEstimateSheetTestServiceDetailView> detailList;

    public static ProjectEstimateSheetTestServiceView assemble(ProjectEstimateSheetTestService source) {
        ProjectEstimateSheetTestServiceView target = new ProjectEstimateSheetTestServiceView();
        target.id = source.getId();
        target.title = source.getTitle();
        target.detailList = source.getDetailList().stream()
            .map(ProjectEstimateSheetTestServiceDetailView::assemble)
            .collect(Collectors.toList());
        return target;
    }
}
