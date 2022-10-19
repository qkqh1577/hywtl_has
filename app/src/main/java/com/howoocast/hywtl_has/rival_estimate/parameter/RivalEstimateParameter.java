package com.howoocast.hywtl_has.rival_estimate.parameter;

import com.howoocast.hywtl_has.rival_estimate.domain.RivalEstimate;
import javax.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RivalEstimateParameter {

    private Long businessId;

    @Min(value = 0, message = RivalEstimate.KEY + ".test_amount.positive_or_zero")
    private Long testAmount;

    @Min(value = 0, message = RivalEstimate.KEY + ".review_amount.positive_or_zero")
    private Long reviewAmount;

    @Min(value = 0, message = RivalEstimate.KEY + ".total_amount.positive_or_zero")
    private Long totalAmount;

    private String expectedDuration;
}
