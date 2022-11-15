package com.howoocast.hywtl_has.project_estimate.parameter;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
public class ProjectEstimatePlanParameter {

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate estimateDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
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
