package com.howoocast.hywtl_has.project_bid.parameter;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectBidParameter {


    private LocalDate beginDate;

    private LocalDate closeDate;

    private Long winId;

    private String bidOrganization;

    private LocalDate bidDate;

    private Long testAmount;

    private Long reviewAmount;

    private Long totalAmount;

    private String expectedDuration;
}
