package com.howoocast.hywtl_has.project_basic.parameter;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectBasicFailReasonUpdateParameter {

    private Long winId;
    private Long testAmount;
    private Long reviewAmount;
    private Long totalAmount;
    private String expectedDuration;
    private String reason;
}
