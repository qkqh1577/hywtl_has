package com.howoocast.hywtl_has.project_estimate.parameter;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectEstimatePlanParameter {

    private LocalDate estimateDate;
    private LocalDate expectedServiceDate;
    private Integer expectedTestDeadline;
    private Integer expectedFinalReviewDeadline;
    private Long testAmount;
    private Long reviewAmount;
    private Long discountAmount;
    private Long totalAmount;
}
