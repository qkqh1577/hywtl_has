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
    private Integer expectedFinalReportDeadline;
    private Long testAmount;
    private Long reviewAmount;
    private Long discountAmount;
    private Long totalAmount;
    private Long manager1Id;
    private Long manager2Id;
}
