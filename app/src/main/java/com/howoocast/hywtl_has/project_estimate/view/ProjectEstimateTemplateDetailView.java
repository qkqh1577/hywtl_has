package com.howoocast.hywtl_has.project_estimate.view;

import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateTemplateDetail;
import java.util.List;
import lombok.Getter;

@Getter
public class ProjectEstimateTemplateDetailView {

    private List<String> titleList;
    private String unit;
    private Long testCount;
    private Long unitAmount;
    private Long totalAmount;
    private Boolean inUse;
    private String note;

    public static ProjectEstimateTemplateDetailView assemble(ProjectEstimateTemplateDetail source) {
        ProjectEstimateTemplateDetailView target = new ProjectEstimateTemplateDetailView();
        target.titleList = source.getTitleList();
        target.unit = source.getUnit();
        target.testCount = source.getTestCount();
        target.unitAmount = source.getUnitAmount();
        target.totalAmount = source.getTotalAmount();
        target.inUse = source.getInUse();
        target.note = source.getNote();
        return target;
    }
}
