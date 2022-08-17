package com.howoocast.hywtl_has.project_estimate.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project_estimate.common.ProjectEstimateSheetStatus;
import com.howoocast.hywtl_has.project_review.domain.ProjectReview;
import com.howoocast.hywtl_has.project_target.domain.ProjectTarget;
import com.howoocast.hywtl_has.user.domain.User;
import java.time.LocalDate;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.lang.Nullable;

@Slf4j
@Getter
@Entity
@Table(name = ProjectEstimateSheet.KEY)
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update " + ProjectEstimateSheet.KEY + " set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectEstimateSheet extends CustomEntity {

    public static final String KEY = "project_estimate_sheet";
    @JsonBackReference
    @Getter(AccessLevel.NONE)
    @NotNull
    @ManyToOne
    private Project project;

    @NotNull
    @Column(nullable = false)
    private Boolean confirmed; // 확정 여부

    @NotNull
    @Column(nullable = false)
    private ProjectEstimateSheetStatus status; // 상태

    @NotBlank
    @Column(nullable = false)
    private String title; // 견적 번호

    private String note; // 비고

    @NotNull
    @ManyToOne
    private User writer; // 작성자

    @NotNull
    @Column(nullable = false)
    private LocalDate estimateDate; // 견적 일자

    private LocalDate expectedStartMonth; // 착수 가능 월
    @NotNull
    @ManyToOne
    private User salesTeamLeader; // 영업팀장

    @ManyToOne
    private User salesManagementLeader; // 영업실장

    private Integer engineeringPeriod; // 주골조설계 소요 기간

    private Integer finalReportPeriod; // 최종보고서 기간

    @ManyToOne
    private ProjectReview review; // 형상비 검토

    @ManyToOne
    private ProjectTarget target; // 실험대상

    @NotEmpty
    @OneToMany(cascade = CascadeType.ALL)
    @OrderBy("seq asc")
    private List<ProjectEstimateSheetTestService> testServiceList; // 용역 항목 목록

    private Long specialDiscount; // 특별 할인

    @NotEmpty
    @ElementCollection
    @OrderBy("seq asc")
    private List<ProjectEstimateSheetComment> commentList;

    private static ProjectEstimateSheet of(
        Project project,
        Boolean confirmed,
        ProjectEstimateSheetStatus status,
        String title,
        String note,
        User writer,
        LocalDate estimateDate,
        LocalDate expectedStartMonth,
        User salesTeamLeader,
        @Nullable User salesManagementLeader,
        Integer engineeringPeriod,
        Integer finalReportPeriod,
        List<ProjectEstimateSheetTestService> testServiceList,
        Long specialDiscount,
        List<ProjectEstimateSheetComment> commentList
    ) {
        ProjectEstimateSheet instance = new ProjectEstimateSheet();
        instance.project = project;
        instance.writer = writer;
        instance.change(
            confirmed,
            status,
            title,
            note,
            estimateDate,
            expectedStartMonth,
            salesTeamLeader,
            salesManagementLeader,
            engineeringPeriod,
            finalReportPeriod,
            testServiceList,
            specialDiscount,
            commentList
        );
        return instance;
    }

    public static ProjectEstimateSheet of(
        Project project,
        Boolean confirmed,
        ProjectEstimateSheetStatus status,
        String title,
        String note,
        User writer,
        LocalDate estimateDate,
        LocalDate expectedStartMonth,
        User salesTeamLeader,
        @Nullable User salesManagementLeader,
        Integer engineeringPeriod,
        Integer finalReportPeriod,
        ProjectReview review,
        List<ProjectEstimateSheetTestService> detailList,
        Long specialDiscount,
        List<ProjectEstimateSheetComment> commentList
    ) {
        ProjectEstimateSheet instance = ProjectEstimateSheet.of(
            project,
            confirmed,
            status,
            title,
            note,
            writer,
            estimateDate,
            expectedStartMonth,
            salesTeamLeader,
            salesManagementLeader,
            engineeringPeriod,
            finalReportPeriod,
            detailList,
            specialDiscount,
            commentList
        );
        instance.review = review;
        return instance;
    }

    public static ProjectEstimateSheet of(
        Project project,
        Boolean confirmed,
        ProjectEstimateSheetStatus status,
        String title,
        String note,
        User writer,
        LocalDate estimateDate,
        LocalDate expectedStartMonth,
        User salesTeamLeader,
        @Nullable User salesManagementLeader,
        Integer engineeringPeriod,
        Integer finalReportPeriod,
        ProjectTarget target,
        List<ProjectEstimateSheetTestService> detailList,
        Long specialDiscount,
        List<ProjectEstimateSheetComment> commentList
    ) {
        ProjectEstimateSheet instance = ProjectEstimateSheet.of(
            project,
            confirmed,
            status,
            title,
            note,
            writer,
            estimateDate,
            expectedStartMonth,
            salesTeamLeader,
            salesManagementLeader,
            engineeringPeriod,
            finalReportPeriod,
            detailList,
            specialDiscount,
            commentList
        );
        instance.target = target;
        return instance;
    }

    public void change(
        Boolean confirmed,
        ProjectEstimateSheetStatus status,
        String title,
        String note,
        LocalDate estimateDate,
        LocalDate expectedStartMonth,
        User salesTeamLeader,
        @Nullable User salesManagementLeader,
        Integer engineeringPeriod,
        Integer finalReportPeriod,
        List<ProjectEstimateSheetTestService> testServiceList,
        Long specialDiscount,
        List<ProjectEstimateSheetComment> commentList
    ) {
        this.confirmed = confirmed;
        this.status = status;
        this.title = title;
        this.note = note;
        this.estimateDate = estimateDate;
        this.expectedStartMonth = expectedStartMonth;
        this.salesTeamLeader = salesTeamLeader;
        this.salesManagementLeader = salesManagementLeader;
        this.engineeringPeriod = engineeringPeriod;
        this.finalReportPeriod = finalReportPeriod;
        this.testServiceList = testServiceList;
        this.specialDiscount = specialDiscount;
        this.commentList = commentList;
    }
}
