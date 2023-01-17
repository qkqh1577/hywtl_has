package com.howoocast.hywtl_has.project_estimate.parameter;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectFinalEstimateParameter {
    private LocalDate estimateDate;
    private Boolean resetEstimateDate;
    private String code;
    private Boolean resetCode;
    private String targetTest;
    private Boolean resetTargetTest;
    private Long testAmount;
    private Boolean resetTestAmount;
    private Long reviewAmount;
    private Boolean resetReviewAmount;
    private Long totalAmount;
    private Boolean resetTotalAmount;
    private String type;
    private Boolean resetType;
    private Long businessId;
    private Boolean resetBusinessId;
    private Long writerId;
    private Boolean resetWriterId;
    private Boolean isSent;
    private Boolean resetIsSent;
    private String note;
    private Boolean resetNote;
}
