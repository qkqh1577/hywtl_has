package com.howoocast.hywtl_has.project_estimate.view;

import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateSheetTestServiceDetail;
import java.util.List;
import lombok.Getter;

@Getter
public class ProjectEstimateSheetTestServiceDetailView {

    private Long id;

    private List<String> titleList;

    private String unit;

    private Integer count;

    private Long unitPrice;

    private Long totalPrice;

    private Boolean isIncluded;

    private String note;

    public static ProjectEstimateSheetTestServiceDetailView assemble(ProjectEstimateSheetTestServiceDetail source) {
        ProjectEstimateSheetTestServiceDetailView target = new ProjectEstimateSheetTestServiceDetailView();
        target.id = source.getId();
        target.titleList = source.getTitleList();
        target.unit = source.getUnit();
        target.count = source.getCount();
        target.unitPrice = source.getUnitPrice();
        target.totalPrice = source.getTotalPrice();
        target.isIncluded = source.getIsIncluded();
        target.note = source.getNote();
        return target;
    }
}
