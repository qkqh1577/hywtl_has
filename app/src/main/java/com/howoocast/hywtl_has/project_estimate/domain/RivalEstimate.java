package com.howoocast.hywtl_has.project_estimate.domain;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;
import org.springframework.lang.Nullable;

@Slf4j
@Getter
@Entity
@Table(name = RivalEstimate.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RivalEstimate extends CustomEntity {

    public static final String KEY = "project_rival_estimate";

    @ManyToOne
    private Business business;

    @ManyToOne
    private Project project;

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

    public static RivalEstimate of(
        Project project
    ) {

        RivalEstimate instance = new RivalEstimate();
        instance.project = project;
        return instance;
    }

    public void update(
        @Nullable Business business,
        @Nullable Long testAmount,
        @Nullable Long reviewAmount,
        @Nullable Long totalAmount,
        @Nullable String expectedDuration
    ) {
        if (Objects.nonNull(business)) {
            this.business = business;
        }
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
