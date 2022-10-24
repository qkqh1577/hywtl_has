package com.howoocast.hywtl_has.project_estimate.domain;

import com.howoocast.hywtl_has.user.domain.User;
import java.time.LocalDate;
import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

/**
 * 작업 목표 및 담당자 정보
 */
@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectEstimatePlan {

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
    private Integer expectedFinalReportDeadline;

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

    @ManyToOne
    private User manager1;

    @ManyToOne
    private User manager2;

    public static ProjectEstimatePlan of(
        LocalDate estimateDate,
        LocalDate expectedServiceDate,
        Integer expectedTestDeadline,
        Integer expectedFinalReportDeadline,
        Long testAmount,
        Long reviewAmount,
        Long discountAmount,
        Long totalAmount
    ) {
        ProjectEstimatePlan instance = new ProjectEstimatePlan();
        instance.estimateDate = estimateDate;
        instance.expectedServiceDate = expectedServiceDate;
        instance.expectedTestDeadline = expectedTestDeadline;
        instance.expectedFinalReportDeadline = expectedFinalReportDeadline;
        instance.testAmount = testAmount;
        instance.reviewAmount = reviewAmount;
        instance.discountAmount = discountAmount;
        instance.totalAmount = totalAmount;
        return instance;
    }

    public static ProjectEstimatePlan of(
        LocalDate estimateDate,
        LocalDate expectedServiceDate,
        Integer expectedTestDeadline,
        Integer expectedFinalReportDeadline,
        Long testAmount,
        Long reviewAmount,
        Long discountAmount,
        Long totalAmount,
        @Nullable User manager1,
        @Nullable User manager2
    ) {
        ProjectEstimatePlan instance = new ProjectEstimatePlan();
        instance.estimateDate = estimateDate;
        instance.expectedServiceDate = expectedServiceDate;
        instance.expectedTestDeadline = expectedTestDeadline;
        instance.expectedFinalReportDeadline = expectedFinalReportDeadline;
        instance.testAmount = testAmount;
        instance.reviewAmount = reviewAmount;
        instance.discountAmount = discountAmount;
        instance.totalAmount = totalAmount;
        instance.manager1 = manager1;
        instance.manager2 = manager2;
        return instance;
    }
}
