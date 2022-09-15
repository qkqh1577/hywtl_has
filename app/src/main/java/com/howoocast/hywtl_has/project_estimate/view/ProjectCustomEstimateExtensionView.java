package com.howoocast.hywtl_has.project_estimate.view;

import com.howoocast.hywtl_has.project_estimate.domain.ProjectCustomEstimateComplexBuilding;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectCustomEstimateComplexSite;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectCustomEstimateExtensionInput;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class ProjectCustomEstimateExtensionView {

    private LocalDate estimateDate;
    private LocalDate expectedServiceDate;
    private Integer expectedTestDeadline;
    private Integer expectedFinalReviewDeadline;
    private Long testAmount;
    private Long reviewAmount;
    private Long discountAmount;
    private Long totalAmount;
    private List<ProjectCustomEstimateComplexSiteView> siteList;
    private List<ProjectCustomEstimateComplexBuildingView> buildingList;

    public static ProjectCustomEstimateExtensionView assemble(
        ProjectCustomEstimateExtensionInput extensionInput,
        List<ProjectCustomEstimateComplexSite> siteList,
        List<ProjectCustomEstimateComplexBuilding> buildingList
    ) {
        ProjectCustomEstimateExtensionView target = new ProjectCustomEstimateExtensionView();
        target.estimateDate = extensionInput.getEstimateDate();
        target.expectedServiceDate = extensionInput.getExpectedServiceDate();
        target.expectedTestDeadline = extensionInput.getExpectedTestDeadline();
        target.expectedFinalReviewDeadline = extensionInput.getExpectedFinalReviewDeadline();
        target.testAmount = extensionInput.getTestAmount();
        target.reviewAmount = extensionInput.getReviewAmount();
        target.discountAmount = extensionInput.getDiscountAmount();
        target.reviewAmount = extensionInput.getReviewAmount();
        target.totalAmount = extensionInput.getTotalAmount();
        target.siteList = siteList.stream().map(ProjectCustomEstimateComplexSiteView::assemble)
            .collect(Collectors.toList());
        target.buildingList = buildingList.stream().map(ProjectCustomEstimateComplexBuildingView::assemble).collect(
            Collectors.toList());

        return target;
    }
}
