package com.howoocast.hywtl_has.project_estimate.parameter;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectFinalEstimateUpdateParameter {
    private String code;
    private String type;
    private Boolean isSent;
    private Long recipientId;
    private String note;
    private Long createdById;
    private Long testAmount;
    private Long reviewAmount;
    private Long totalAmount;
    private String targetTest;

}
