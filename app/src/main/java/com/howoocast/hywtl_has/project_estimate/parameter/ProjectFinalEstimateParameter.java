package com.howoocast.hywtl_has.project_estimate.parameter;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectFinalEstimateParameter {
    private LocalDate estimateDate;
    private String code;
    private String targetTest;
    private Long testAmount;
    private Long reviewAmount;
    private Long totalAmount;
    private String type;
    private Long businessId;
    private Long writerId;
    private Boolean isSent;
    private String note;

}
