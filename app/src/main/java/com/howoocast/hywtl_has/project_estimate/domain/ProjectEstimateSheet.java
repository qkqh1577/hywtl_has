package com.howoocast.hywtl_has.project_estimate.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project_estimate.common.ProjectEstimateSheetStatus;
import com.howoocast.hywtl_has.project_review.domain.ProjectReview;
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
@Table(name = "project_estimate_sheet")
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update project_estimate_sheet set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectEstimateSheet extends CustomEntity {

    @JsonBackReference
    @Getter(AccessLevel.NONE)
    @NotNull
    @ManyToOne
    private Project project;

    @NotBlank
    @Column(nullable = false)
    private Boolean confirmed; // 확정 여부

    @NotNull
    @Column(nullable = false)
    private ProjectEstimateSheetStatus status; // 상태

    @NotBlank
    @Column(nullable = false)
    private String title; // 제목

    private String memo; // 비고

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

    @NotNull
    @ManyToOne
    private ProjectReview review; // 형상비 검토

    @NotEmpty
    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.ALL})
    @OrderBy("seq")
    private List<ProjectEstimateSheetDetail> detailList; // 용역 항목 목록

    private Long specialDiscount; // 특별 할인

    @NotEmpty
    @ElementCollection
    @OrderBy("seq")
    private List<ProjectEstimateSheetComment> commentList;

    public static ProjectEstimateSheet of(
        Project project,
        Boolean confirmed,
        ProjectEstimateSheetStatus status,
        String title,
        String memo,
        User writer,
        LocalDate estimateDate,
        LocalDate expectedStartMonth,
        User salesTeamLeader,
        @Nullable User salesManagementLeader,
        ProjectReview review,
        List<ProjectEstimateSheetDetail> detailList,
        Long specialDiscount,
        List<ProjectEstimateSheetComment> commentList
    ) {
        ProjectEstimateSheet instance = new ProjectEstimateSheet();
        instance.project = project;
        instance.writer = writer;
        instance.review = review;
        instance.change(
            confirmed,
            status,
            title,
            memo,
            estimateDate,
            expectedStartMonth,
            salesTeamLeader,
            salesManagementLeader,
            detailList,
            specialDiscount,
            commentList
        );
        return instance;
    }

    public void change(
        Boolean confirmed,
        ProjectEstimateSheetStatus status,
        String title,
        String memo,
        LocalDate estimateDate,
        LocalDate expectedStartMonth,
        User salesTeamLeader,
        @Nullable User salesManagementLeader,
        List<ProjectEstimateSheetDetail> detailList,
        Long specialDiscount,
        List<ProjectEstimateSheetComment> commentList
    ) {
        this.confirmed = confirmed;
        this.status = status;
        this.title = title;
        this.memo = memo;
        this.estimateDate = estimateDate;
        this.expectedStartMonth = expectedStartMonth;
        this.salesTeamLeader = salesTeamLeader;
        this.salesManagementLeader = salesManagementLeader;
        this.detailList = detailList;
        this.specialDiscount = specialDiscount;
        this.commentList = commentList;
    }
}
