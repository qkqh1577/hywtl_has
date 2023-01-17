package com.howoocast.hywtl_has.project_estimate.domain;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.user.domain.User;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.Getter;
import org.hibernate.annotations.Where;
import org.springframework.lang.Nullable;

@Getter
@Entity
@Table(name = ProjectFinalEstimate.KEY)
@Where(clause = "deleted_at is null")
public class ProjectFinalEstimate extends CustomEntity {

    public static final String KEY = "project_final_estimate";

    /**
     * 견적 번호
     */
    private String code;

    /**
     * 견적 구분
     */
    private String type;

    /**
     * 송부 여부
     */
    private Boolean isSent;

    /**
     * 견적 일자
     */
    private LocalDate estimateDate;

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
     * 견적업체
     */
    @OneToOne
    private Business business;
    /**
     * 비고
     */
    private String note;

    /**
     * 프로젝트
     */
    @OneToOne
    private Project project;

    /**
     * 작성자
     */
    @OneToOne
    private User writer;

    public static ProjectFinalEstimate of(Project project) {
        ProjectFinalEstimate instance = new ProjectFinalEstimate();
        instance.project = project;
        return instance;
    }

    public List<EventEntity> update(
        @Nullable LocalDate estimateDate,
        @Nullable String code,
        @Nullable String targetTest,
        @Nullable Long testAmount,
        @Nullable Long reviewAmount,
        @Nullable Long totalAmount,
        @Nullable String type,
        @Nullable Business business,
        @Nullable User writer,
        @Nullable Boolean isSent,
        @Nullable String note
    ) {
        List<EventEntity> eventList = new ArrayList<>();

        if (Objects.nonNull(estimateDate)) {
            eventList.add(EventEntity.of(
                "견적 일자",
                this.estimateDate,
                estimateDate
            ));
            this.estimateDate = estimateDate;
        }

        if (Objects.nonNull(code)) {
            eventList.add(EventEntity.of(
                "견적 번호",
                this.code,
                code
            ));
            this.code = code;
        }

        if (Objects.nonNull(targetTest)) {
            eventList.add(EventEntity.of(
                "실험 정보",
                this.targetTest,
                targetTest
            ));
            this.targetTest = targetTest;
        }

        if (Objects.nonNull(testAmount)) {
            eventList.add(EventEntity.of(
                "풍동 금액",
                this.testAmount,
                testAmount
            ));
            this.testAmount = testAmount;
        }

        if (Objects.nonNull(reviewAmount)) {
            eventList.add(EventEntity.of(
                "구검",
                this.reviewAmount,
                reviewAmount
            ));
            this.reviewAmount = reviewAmount;
        }

        if (Objects.nonNull(totalAmount)) {
            eventList.add(EventEntity.of(
                "총액",
                this.totalAmount,
                totalAmount
            ));
            this.totalAmount = totalAmount;
        }

        if (Objects.nonNull(type)) {
            eventList.add(EventEntity.of(
                "견적 구분",
                this.type,
                type
            ));
            this.type = type;
        }
        if (Objects.nonNull(business)) {
            eventList.add(EventEntity.of(
                "견적 업체",
                this.business,
                business
            ));
            this.business = business;
        }

        if (Objects.nonNull(writer)) {
            eventList.add(EventEntity.of(
                "등록자",
                this.writer,
                writer
            ));
            this.writer = writer;
        }

        if (Objects.nonNull(isSent)) {
            eventList.add(EventEntity.of(
                "송부 여부",
                this.isSent,
                isSent
            ));
            this.isSent = isSent;
        }

        if (Objects.nonNull(note)) {
            eventList.add(EventEntity.of(
                "비고",
                this.note,
                note
            ));
            this.note = note;
        }

        return eventList;
    }
}
