package com.howoocast.hywtl_has.project_contract.domain;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.user.domain.User;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.Getter;
import org.hibernate.annotations.Where;
import org.springframework.lang.Nullable;

@Getter
@Entity
@Table(name = ProjectFinalContract.KEY)
@Where(clause = "deleted_at is null")
public class ProjectFinalContract extends CustomEntity {

    public static final String KEY = "project_final_contract";

    /**
     * 계약서 날짜
     */
    private LocalDate contractDate;

    /**
     * 계약 분류
     */
    private String contractType;

    /**
     * 계약 번호
     */
    private String code;

    /**
     * 견적 번호
     */
    private String estimateCode;

    /**
     * 송부 여부
     */
    private Boolean isSent;

    /**
     * 비고
     */
    private String note;

    private String targetTest;

    /**
     * 풍동 금액
     */
    private Long testAmount;

    /**
     * 구검 금액
     */
    private Long reviewAmount;
    /**
     * 합계(부가세 별도)
     */
    private Long totalAmount;

    /**
     * 일정
     */
    private String schedule;

    /**
     * 발주처
     */
    @OneToOne
    private Business business;
    @OneToOne
    private Project project;

    /**
     * 작성자
     */
    @OneToOne
    private User writer;

    @OneToOne(cascade = CascadeType.ALL)
    private ProjectContractCollection collection;

    public static ProjectFinalContract of(Project project) {
        ProjectFinalContract instance = new ProjectFinalContract();
        instance.project = project;
        return instance;
    }

    public List<EventEntity> update(
        @Nullable LocalDate contractDate,
        @Nullable Boolean resetContractDate,
        @Nullable String contractType,
        @Nullable Boolean resetContractType,
        @Nullable String code,
        @Nullable Boolean resetCode,
        @Nullable String estimateCode,
        @Nullable Boolean resetEstimateCode,
        @Nullable String targetTest,
        @Nullable Boolean resetTargetTest,
        @Nullable Long testAmount,
        @Nullable Boolean resetTestAmount,
        @Nullable Long reviewAmount,
        @Nullable Boolean resetReviewAmount,
        @Nullable Long totalAmount,
        @Nullable Boolean resetTotalAmount,
        @Nullable String schedule,
        @Nullable Boolean resetSchedule,
        @Nullable Business business,
        @Nullable Boolean resetBusinessId,
        @Nullable String note,
        @Nullable Boolean resetNote,
        @Nullable User writer,
        @Nullable Boolean resetWriterId,
        @Nullable Boolean isSent,
        @Nullable Boolean resetIsSent) {
        List<EventEntity> eventList = new ArrayList<>();
        if (Objects.nonNull(contractDate) || Boolean.TRUE.equals(resetContractDate)) {
            eventList.add(EventEntity.of(
                "계약 일자",
                this.contractDate,
                contractDate
            ));
            this.contractDate = contractDate;
        }

        if (Objects.nonNull(contractType) || Boolean.TRUE.equals(resetContractType)) {
            eventList.add(EventEntity.of(
                "계약 분류",
                this.contractType,
                contractType
            ));
            this.contractType = contractType;
        }

        if (Objects.nonNull(code) || Boolean.TRUE.equals(resetCode)) {
            eventList.add(EventEntity.of(
                "계약 번호",
                this.code,
                code
            ));
            this.code = code;
        }

        if (Objects.nonNull(estimateCode) || Boolean.TRUE.equals(resetEstimateCode)) {
            eventList.add(EventEntity.of(
                "견적 번호",
                this.estimateCode,
                estimateCode
            ));
            this.estimateCode = estimateCode;
        }

        if (Objects.nonNull(targetTest) || Boolean.TRUE.equals(resetTargetTest)) {
            eventList.add(EventEntity.of(
                "실험 정보",
                this.targetTest,
                targetTest
            ));
            this.targetTest = targetTest;
        }

        if (Objects.nonNull(testAmount) || Boolean.TRUE.equals(resetTestAmount)) {
            eventList.add(EventEntity.of(
                "풍동 금액",
                this.testAmount,
                testAmount
            ));
            this.testAmount = testAmount;
        }

        if (Objects.nonNull(reviewAmount) || Boolean.TRUE.equals(resetReviewAmount)) {
            eventList.add(EventEntity.of(
                "구검",
                this.reviewAmount,
                reviewAmount
            ));
            this.reviewAmount = reviewAmount;
        }

        if (Objects.nonNull(totalAmount) || Boolean.TRUE.equals(resetTotalAmount)) {
            eventList.add(EventEntity.of(
                "총액",
                this.totalAmount,
                totalAmount
            ));
            this.totalAmount = totalAmount;
        }

        if (Objects.nonNull(schedule) || Boolean.TRUE.equals(resetSchedule)) {
            eventList.add(EventEntity.of(
                "일정",
                this.schedule,
                schedule
            ));
            this.schedule = schedule;
        }

        if (Objects.nonNull(business) || Boolean.TRUE.equals(resetBusinessId)) {
            eventList.add(EventEntity.of(
                "발주처",
                this.business,
                business
            ));
            this.business = business;
        }

        if (Objects.nonNull(note) || Boolean.TRUE.equals(resetNote)) {
            eventList.add(EventEntity.of(
                "비고",
                this.note,
                note
            ));
            this.note = note;
        }

        if (Objects.nonNull(writer) || Boolean.TRUE.equals(resetWriterId)) {
            eventList.add(EventEntity.of(
                "등록자",
                this.writer,
                writer
            ));
            this.writer = writer;
        }

        if (Objects.nonNull(isSent) || Boolean.TRUE.equals(resetIsSent)) {
            eventList.add(EventEntity.of(
                "송부 여부",
                this.isSent,
                isSent
            ));
            this.isSent = isSent;
        }

        return eventList;
    }

    public void updateCollection(ProjectContractCollection collection) {
        this.collection = collection;
    }
}
