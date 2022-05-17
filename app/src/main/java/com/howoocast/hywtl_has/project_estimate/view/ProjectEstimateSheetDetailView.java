package com.howoocast.hywtl_has.project_estimate.view;

import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateSheetDetail;
import java.util.List;
import lombok.Getter;

@Getter
public class ProjectEstimateSheetDetailView {

    private String title;

    private List<String> subTitleList;

    private String unit;

    private Integer count;

    private Long unitPrice;

    private Long totalPrice;

    private Boolean isIncluded;

    private String memo;

    public static ProjectEstimateSheetDetailView assemble(ProjectEstimateSheetDetail source) {
        ProjectEstimateSheetDetailView target = new ProjectEstimateSheetDetailView();
        target.title = source.getTitle();
        target.subTitleList = source.getSubTitleList();
        target.unit = source.getUnit();
        target.count = source.getCount();
        target.unitPrice = source.getUnitPrice();
        target.totalPrice = source.getTotalPrice();
        target.isIncluded = source.getIsIncluded();
        target.memo = source.getMemo();
        return target;
    }
}
