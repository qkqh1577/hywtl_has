package com.howoocast.hywtl_has.project_bid.view;

import com.howoocast.hywtl_has.business.view.BusinessView;
import com.howoocast.hywtl_has.project_bid.domain.RivalBid;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;
import lombok.Getter;

@Getter
public class RivalBidView {

    private Long id;
    private BusinessView business;
    private Long testAmount;
    private Long reviewAmount;
    private Long totalAmount;
    private String expectedDuration;
    private LocalDateTime modifiedAt;

    public static RivalBidView assemble(RivalBid source) {
        RivalBidView target = new RivalBidView();
        target.id = source.getId();
        if (Objects.nonNull(source.getBusiness())) {
            target.business = BusinessView.assemble(source.getBusiness());
        }
        target.testAmount = source.getTestAmount();
        target.reviewAmount = source.getReviewAmount();
        target.totalAmount = source.getTotalAmount();
        target.expectedDuration = source.getExpectedDuration();
        target.modifiedAt = Optional.ofNullable(source.getModifiedAt()).orElse(source.getCreatedAt());
        return target;
    }
}
