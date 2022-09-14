package com.howoocast.hywtl_has.project_bid.domain;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import java.time.LocalDate;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Slf4j
@Getter
@Entity
@Table(name = ProjectBid.KEY)
@DynamicUpdate
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update " + ProjectBid.KEY + " set deleted_at = now() where id=?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectBid extends CustomEntity {

    public static final String KEY = "project_bid";

    /**
     * 입찰 공고 기간 개시일
     */
    private LocalDate beginDate;
    /**
     * 입찰 공고 기간 마감일
     */
    private LocalDate closeDate;

    /**
     * 낙찰 업체
     */
    @ManyToOne
    private Business win;

    /**
     * 입찰 기관
     */
    private String bidOrganization;

    /**
     * 입찰 일자
     */
    private LocalDate bidDate;

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

    @OneToOne
    @JoinColumn(name = Project.KEY + "_id")
    private Project project;

    public static ProjectBid of(
        Project project
    ) {
        ProjectBid instance = new ProjectBid();
        instance.project = project;
        return instance;
    }

    public void update(
        LocalDate beginDate,
        LocalDate closeDate,
        Business win,
        String bidOrganization,
        LocalDate bidDate,
        Long testAmount,
        Long reviewAmount,
        Long totalAmount,
        String expectedDuration
    ) {
        if (Objects.nonNull(beginDate)) {
            this.beginDate = beginDate;
        }
        if (Objects.nonNull(closeDate)) {
            this.closeDate = closeDate;
        }
        if (Objects.nonNull(win)) {
            this.win = win;
        }
        if (Objects.nonNull(bidOrganization)) {
            this.bidOrganization = bidOrganization;
        }
        if (Objects.nonNull(bidDate)) {
            this.bidDate = bidDate;
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
