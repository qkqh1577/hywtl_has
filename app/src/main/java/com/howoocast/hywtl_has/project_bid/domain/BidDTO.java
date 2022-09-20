package com.howoocast.hywtl_has.project_bid.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import java.util.Objects;
import javax.annotation.Nullable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public abstract class BidDTO extends CustomEntity {

    /**
     * 풍동 금액
     */
    private Long testAmount;

    /**
     * 구검 금액
     */
    private Long reviewAmount;

    /**
     * 총액
     */
    private Long totalAmount;

    /**
     * 일정
     */
    private String expectedDuration;

    public void update(
        @Nullable Long testAmount,
        @Nullable Long reviewAmount,
        @Nullable Long totalAmount,
        @Nullable String expectedDuration
    ) {
        if (Objects.nonNull(testAmount)) {
            this.testAmount = testAmount;
        }
        if (Objects.nonNull(reviewAmount)) {
            this.reviewAmount = reviewAmount;
        }
        if (Objects.nonNull(totalAmount)) {
            this.totalAmount = totalAmount;
        }
        if (Objects.nonNull(expectedDuration)) {
            this.expectedDuration = expectedDuration;
        }
    }

}
