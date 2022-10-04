package com.howoocast.hywtl_has.business_trip.parameter;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BusinessTripExpanseParameter {
    private Integer distance;
    private String distanceComment;
    private Integer accommodationFee;
    private String accommodationFeeComment;
    private Integer transportationFee;
    private String transportationFeeComment;
    private Integer extraFee;
    private String extraFeeComment;
}
