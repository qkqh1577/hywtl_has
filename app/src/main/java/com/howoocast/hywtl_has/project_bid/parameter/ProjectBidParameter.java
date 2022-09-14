package com.howoocast.hywtl_has.project_bid.parameter;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
public class ProjectBidParameter {


    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate beginDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate closeDate;

    private Long BusinessId;

    private String bidOrganization;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate bidDate;

    private Long testAmount;

    private Long reviewAmount;

    private Long totalAmount;

    private String expectedDuration;
}
