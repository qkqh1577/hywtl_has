package com.howoocast.hywtl_has.project_estimate.view;

import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimatePlan;
import java.time.LocalDate;
import lombok.Getter;

@Getter
public class ProjectEstimatePlanView {

    private LocalDate estimateDate;
    private LocalDate expectedServiceDate;
    private Integer expectedTestDeadline;
    private Integer expectedFinalReportDeadline;
    private Long testAmount;
    private Long reviewAmount;
    private Long discountAmount;
    private Long totalAmount;

    public static ProjectEstimatePlanView assemble(
        ProjectEstimatePlan extensionInput
    ) {
        ProjectEstimatePlanView target = new ProjectEstimatePlanView();
        target.estimateDate = extensionInput.getEstimateDate();
        target.expectedServiceDate = extensionInput.getExpectedServiceDate();
        target.expectedTestDeadline = extensionInput.getExpectedTestDeadline();
        target.expectedFinalReportDeadline = extensionInput.getExpectedFinalReportDeadline();
        target.testAmount = extensionInput.getTestAmount();
        target.reviewAmount = extensionInput.getReviewAmount();
        target.discountAmount = extensionInput.getDiscountAmount();
        target.reviewAmount = extensionInput.getReviewAmount();
        target.totalAmount = extensionInput.getTotalAmount();
        return target;
    }
}
