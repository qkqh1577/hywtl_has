package com.howoocast.hywtl_has.rival_estimate.view;

import com.howoocast.hywtl_has.business.view.BusinessShortView;
import com.howoocast.hywtl_has.rival_estimate.domain.RivalEstimate;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;
import lombok.Getter;

@Getter
public class RivalEstimateView {

    private Long id;
    private BusinessShortView business;
    private Long testAmount;
    private Long reviewAmount;
    private Long totalAmount;
    private String expectedDuration;
    private LocalDateTime modifiedAt;

    public static RivalEstimateView assemble(RivalEstimate source) {
        RivalEstimateView target = new RivalEstimateView();
        target.id = source.getId();
        if (Objects.nonNull(source.getBusiness())) {
            target.business = BusinessShortView.assemble(source.getBusiness());
        }
        target.testAmount = source.getTestAmount();
        target.reviewAmount = source.getReviewAmount();
        target.totalAmount = source.getTotalAmount();
        target.expectedDuration = source.getExpectedDuration();
        target.modifiedAt = Optional.ofNullable(source.getModifiedAt()).orElse(source.getCreatedAt());
        return target;
    }
}
