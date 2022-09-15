package com.howoocast.hywtl_has.project_estimate.domain;

import java.time.LocalDate;
import javax.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 커스텀 견적서 실험 정보
 */
@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectCustomEstimateExtensionInput {

    /**
     * 견적 일자
     */
    private LocalDate estimateDate;

    /**
     * 착수 가능일
     */
    private LocalDate expectedServiceDate;

    /**
     * 설풍 납품 가능 주
     */
    private Integer expectedTestDeadline;

    /**
     * 최종 보고서 납품 가능 주
     */
    private Integer expectedFinalReviewDeadline;

    /**
     * 풍동 금액
     */
    private Long testAmount;

    /**
     * 구검 금액
     */
    private Long reviewAmount;

    /**
     * 특별 할인
     */
    private Long discountAmount;

    /**
     * 합계(부가세 별도)
     */
    private Long totalAmount;

    public static ProjectCustomEstimateExtensionInput of(
        LocalDate estimateDate,
        LocalDate expectedServiceDate,
        Integer expectedTestDeadline,
        Integer expectedFinalReviewDeadline,
        Long testAmount,
        Long reviewAmount,
        Long discountAmount,
        Long totalAmount
    ) {
        ProjectCustomEstimateExtensionInput instance = new ProjectCustomEstimateExtensionInput();
        instance.estimateDate = estimateDate;
        instance.expectedServiceDate = expectedServiceDate;
        instance.expectedTestDeadline = expectedTestDeadline;
        instance.expectedFinalReviewDeadline = expectedFinalReviewDeadline;
        instance.testAmount = testAmount;
        instance.reviewAmount = reviewAmount;
        instance.discountAmount = discountAmount;
        instance.totalAmount = totalAmount;
        return instance;
    }


}
