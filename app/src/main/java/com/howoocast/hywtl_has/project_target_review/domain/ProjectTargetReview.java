package com.howoocast.hywtl_has.project_target_review.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.project_target_review.common.ProjectTargetReviewStatus;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project_target_review.exception.ProjectTargetReviewException;
import com.howoocast.hywtl_has.project_target_review.exception.ProjectTargetReviewException.ProjectTargetReviewExceptionType;
import com.howoocast.hywtl_has.project_target_review.repository.ProjectTargetReviewRepository;
import com.howoocast.hywtl_has.user.domain.User;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectTargetReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt; // 생성일시

    @CreatedBy
    @Column(updatable = false)
    private Long createdBy; // 생성자

    @LastModifiedDate
    private LocalDateTime modifiedAt; // 변경일시

    @LastModifiedBy
    private Long modifiedBy; // 변경자

    @Getter(AccessLevel.NONE)
    @Column(insertable = false)
    private LocalDateTime deletedAt; // 삭제일시

    @Getter(AccessLevel.NONE)
    @Column(insertable = false)
    private Long deletedBy; // 삭제자

    @Getter(AccessLevel.NONE)
    @Transient
    private ProjectTargetReviewRepository repository;

    //////////////////////////////////
    //// constructor
    //////////////////////////////////

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
        ProjectTargetReviewRepository repository,
        Project project,
        Boolean confirmed,
        ProjectTargetReviewStatus status,
        String title,
        String memo,
        User writer,
        List<ProjectTargetReviewDetail> detailList
    ) {
        if (Objects.equals(confirmed, Boolean.TRUE)) {
            checkConfirmed(repository, project.getId());
        }

        ProjectTargetReview instance = new ProjectTargetReview();
        instance.project = project;
        instance.confirmed = confirmed;
        instance.status = status;
        instance.title = title;
        instance.memo = memo;
        instance.writer = writer;
        instance.detailList = detailList;
        instance.repository = repository;
        instance.save();
        return instance;
    }

    //////////////////////////////////
    //// finder
    //////////////////////////////////
    public static ProjectTargetReview load(ProjectTargetReviewRepository repository, Long id) {
        ProjectTargetReview instance = repository
            .findByIdAndDeletedAtIsNull(id)
            .orElseThrow(() -> new NotFoundException("project.target.review", id));
        instance.repository = repository;
        return instance;
    }

    public static List<ProjectTargetReview> loadByProjectId(ProjectTargetReviewRepository repository, Long projectId) {
        return repository.findByProject_IdAndDeletedAtIsNull(projectId).stream()
            .peek(item -> item.repository = repository)
            .collect(Collectors.toList());
    }

    //////////////////////////////////
    //// checker
    //////////////////////////////////
    public static void checkConfirmed(ProjectTargetReviewRepository repository, Long projectId) {
        if (repository.findByProject_IdAndConfirmedIsTrueAndDeletedAtIsNull(projectId).isPresent()) {
            throw new ProjectTargetReviewException(ProjectTargetReviewExceptionType.CONFIRMED_EXISTS);
        }
    }

    //////////////////////////////////
    //// modifier
    //////////////////////////////////
    public void confirmOff() {
        if (this.confirmed.equals(Boolean.FALSE)) {
            throw new ProjectTargetReviewException(ProjectTargetReviewExceptionType.ALREADY_UNCONFIRMED);
        }
        this.confirmed = Boolean.FALSE;
        this.save();
    }

    public void confirmOn() {
        if (this.confirmed.equals(Boolean.TRUE)) {
            throw new ProjectTargetReviewException(ProjectTargetReviewExceptionType.ALREADY_CONFIRMED);
        }
        this.repository.findByProject_IdAndConfirmedIsTrueAndDeletedAtIsNull(this.project.getId())
            .ifPresent(ProjectTargetReview::confirmOff);
        this.confirmed = Boolean.TRUE;
        this.save();
    }

    public void update(
        Boolean confirmed,
        ProjectTargetReviewStatus status,
        String title,
        String memo,
        List<ProjectTargetReviewDetail> detailList
    ) {
        if (this.confirmed.equals(Boolean.FALSE) && confirmed.equals(Boolean.TRUE)) {
            checkConfirmed(this.repository, this.getProjectId());
        }
        this.confirmed = confirmed;
        this.status = status;
        this.title = title;
        this.memo = memo;
        this.detailList = detailList;
        this.save();
    }

    public void delete() {
        this.deletedAt = LocalDateTime.now();
        this.save();
    }

    private void save() {
        repository.save(this);
    }
}
