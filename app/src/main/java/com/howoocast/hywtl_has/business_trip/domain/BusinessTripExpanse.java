package com.howoocast.hywtl_has.business_trip.domain;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
@Getter
public class BusinessTripExpanse {

    /**
     * 출장 거리
     */
    @Column(name = "expanse_distance")
    private Integer distance;
    @Column(name = "expanse_distance_comment")
    private String distanceComment;

    /**
     * 숙박비
     */
    @Column(name = "expanse_accommodation_fee")
    private Integer accommodationFee;
    @Column(name = "expanse_accommodation_fee_comment")
    private String accommodationFeeComment;

    /**
     * 교통비
     */
    @Column(name = "expanse_transportation_fee")
    private Integer transportationFee;
    @Column(name = "expanse_transportation_fee_comment")
    private String transportationFeeComment;

    /**
     * 기타
     */
    @Column(name = "expanse_extra_fee")
    private Integer extraFee;
    @Column(name = "expanse_extra_fee_comment")
    private String extraFeeComment;

    public static BusinessTripExpanse of(
            Integer distance, String distanceComment, Integer accommodationFee, String accommodationFeeComment, Integer transportationFee, String transportationFeeComment, Integer extraFee, String extraFeeComment
    ) {
        BusinessTripExpanse businessTripExpanse = new BusinessTripExpanse();
        businessTripExpanse.distance = distance;
        businessTripExpanse.distanceComment = distanceComment;
        businessTripExpanse.accommodationFee = accommodationFee;
        businessTripExpanse.accommodationFeeComment = accommodationFeeComment;
        businessTripExpanse.transportationFee = transportationFee;
        businessTripExpanse.transportationFeeComment = transportationFeeComment;
        businessTripExpanse.extraFee = extraFee;
        businessTripExpanse.extraFeeComment = extraFeeComment;
        return businessTripExpanse;
    }
}
