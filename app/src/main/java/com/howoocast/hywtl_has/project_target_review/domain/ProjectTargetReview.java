package com.howoocast.hywtl_has.project_target_review.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.project_target_review.common.ProjectTargetReviewStatus;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project_target_review.exception.ProjectTargetReviewException;
import com.howoocast.hywtl_has.project_target_review.exception.ProjectTargetReviewException.ProjectTargetReviewExceptionType;
import com.howoocast.hywtl_has.user.domain.User;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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

@Slf4j
@Getter
@Entity
@Table(name = "project_target_review")
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update project_target_review set deleted_at = now() where id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectTargetReview extends CustomEntity {

    @Getter(AccessLevel.NONE)
    @JsonBackReference
    @ManyToOne
    private Project project;

    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(nullable = false)
    private ProjectTargetReviewStatus status;

    @NotNull
    @Column(nullable = false)
    private Boolean confirmed;

    @NotBlank
    @Column(nullable = false)
    private String title;

    private String memo;

    @NotNull
    @ManyToOne
    private User writer;

    @NotEmpty
    @OneToMany(cascade = {CascadeType.ALL, CascadeType.PERSIST})
    private List<ProjectTargetReviewDetail> detailList;

    //////////////////////////////////
    //// getter - setter
    //////////////////////////////////
    public Long getProjectId() {
        return project.getId();
    }

    //////////////////////////////////
    //// builder
    //////////////////////////////////
    public static ProjectTargetReview of(
        Project project,
        Boolean confirmed,
        ProjectTargetReviewStatus status,
        String title,
        String memo,
        User writer,
        List<ProjectTargetReviewDetail> detailList
    ) {
        ProjectTargetReview instance = new ProjectTargetReview();
        instance.project = project;
        instance.confirmed = confirmed;
        instance.status = status;
        instance.title = title;
        instance.memo = memo;
        instance.writer = writer;
        instance.detailList = detailList;
        return instance;
    }

    //////////////////////////////////
    //// modifier
    //////////////////////////////////
    public void confirmOff() {
        if (this.confirmed.equals(Boolean.FALSE)) {
            throw new ProjectTargetReviewException(ProjectTargetReviewExceptionType.ALREADY_UNCONFIRMED);
        }
        this.confirmed = Boolean.FALSE;
    }

    public void confirmOn() {
        if (this.confirmed.equals(Boolean.TRUE)) {
            throw new ProjectTargetReviewException(ProjectTargetReviewExceptionType.ALREADY_CONFIRMED);
        }
        this.confirmed = Boolean.TRUE;
    }

    public void update(
        Boolean confirmed,
        ProjectTargetReviewStatus status,
        String title,
        String memo,
        List<ProjectTargetReviewDetail> detailList
    ) {
        this.confirmed = confirmed;
        this.status = status;
        this.title = title;
        this.memo = memo;
        this.detailList = detailList;
    }

}
