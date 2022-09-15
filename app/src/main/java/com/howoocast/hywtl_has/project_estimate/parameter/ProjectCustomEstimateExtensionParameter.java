package com.howoocast.hywtl_has.project_estimate.parameter;

import java.time.LocalDate;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectCustomEstimateExtensionParameter {

    private LocalDate estimateDate;
    private LocalDate expectedServiceDate;
    private Integer expectedTestDeadline;
    private Integer expectedFinalReviewDeadline;
    private Long testAmount;
    private Long reviewAmount;
    private Long discountAmount;
    private Long totalAmount;
    private List<ProjectCustomEstimateComplexSiteParameter> siteList;
    private List<ProjectCustomEstimateComplexBuildingParameter> buildingList;


}
