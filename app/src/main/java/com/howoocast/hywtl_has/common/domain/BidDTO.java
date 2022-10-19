package com.howoocast.hywtl_has.common.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.annotation.Nullable;
import javax.persistence.MappedSuperclass;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@MappedSuperclass
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

    public List<EventEntity> update(
        @Nullable Long testAmount,
        @Nullable Long reviewAmount,
        @Nullable Long totalAmount,
        @Nullable String expectedDuration
    ) {
        List<EventEntity> eventList = new ArrayList<>();
        if (Objects.nonNull(testAmount)) {
            eventList.add(EventEntity.of(
                "풍동 금액 변경",
                this.testAmount,
                testAmount
            ));
            this.testAmount = testAmount;
        }
        if (Objects.nonNull(reviewAmount)) {
            eventList.add(EventEntity.of(
                "구검 금액 변경",
                this.reviewAmount,
                reviewAmount
            ));
            this.reviewAmount = reviewAmount;
        }
        if (Objects.nonNull(totalAmount)) {
            eventList.add(EventEntity.of(
                "총액 변경",
                this.totalAmount,
                totalAmount
            ));
            this.totalAmount = totalAmount;
        }
        if (Objects.nonNull(expectedDuration)) {
            eventList.add(EventEntity.of(
                "일정 변경",
                this.expectedDuration,
                expectedDuration
            ));
            this.expectedDuration = expectedDuration;
        }
        return eventList;
    }
}
