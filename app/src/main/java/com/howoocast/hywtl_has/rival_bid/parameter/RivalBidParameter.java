package com.howoocast.hywtl_has.rival_bid.parameter;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RivalBidParameter {

    private Long businessId;

    private Long testAmount;

    private Long reviewAmount;

    private Long totalAmount;

    private String expectedDuration;
}
