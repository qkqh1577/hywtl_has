package com.howoocast.hywtl_has.project_bid.domain;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.project.domain.Project;
import java.time.LocalDate;
import java.util.Objects;
import javax.annotation.Nullable;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;

@Slf4j
@Getter
@Entity
@Table(name = ProjectBid.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectBid extends BidDTO {

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
        @Nullable LocalDate beginDate,
        @Nullable LocalDate closeDate,
        @Nullable Business win,
        @Nullable String bidOrganization,
        @Nullable LocalDate bidDate,
        @Nullable Long testAmount,
        @Nullable Long reviewAmount,
        @Nullable Long totalAmount,
        @Nullable String expectedDuration
    ) {
        super.update(
            testAmount,
            reviewAmount,
            totalAmount,
            expectedDuration
        );
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
    }
}
