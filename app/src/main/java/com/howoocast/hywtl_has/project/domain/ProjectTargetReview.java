package com.howoocast.hywtl_has.project.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.howoocast.hywtl_has.common.exception.IllegalRequestException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.project.common.ProjectTargetReviewStatus;
import com.howoocast.hywtl_has.project.repository.ProjectTargetReviewRepository;
import com.howoocast.hywtl_has.user.domain.User;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    private Boolean confirmed;

    @NotBlank
    @Column(nullable = false)
    private String title;

    private String memo;

    @NotNull
    @ManyToOne
    private User writer;

    @NotNull
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdTime;

    @Column(insertable = false)
    private LocalDateTime updatedTime;

    @Column(insertable = false)
    private LocalDateTime deletedTime;

    @Getter(AccessLevel.NONE)
    @Transient
    private ProjectTargetReviewRepository repository;

    //////////////////////////////////
    //// constructor
    //////////////////////////////////

    //////////////////////////////////
    //// getter - setter
    //////////////////////////////////

    //////////////////////////////////
    //// builder
    //////////////////////////////////
    public static ProjectTargetReview of(
        ProjectTargetReviewRepository repository,
        Project project,
        String title,
        String memo,
        User writer
    ) {
        ProjectTargetReview instance = new ProjectTargetReview();
        instance.project = project;
        instance.title = title;
        instance.memo = memo;
        instance.writer = writer;
        instance.status = ProjectTargetReviewStatus.DRAFT;
        instance.confirmed = Boolean.FALSE;
        instance.createdTime = LocalDateTime.now();
        instance.repository = repository;
        instance.save();
        return instance;
    }

    //////////////////////////////////
    //// finder
    //////////////////////////////////
    public static ProjectTargetReview load(ProjectTargetReviewRepository repository, Long id) {
        ProjectTargetReview instance = repository
            .findByIdAndDeletedTimeIsNull(id)
            .orElseThrow(() -> new NotFoundException("project.target.review", id));
        instance.repository = repository;
        return instance;
    }

    public static List<ProjectTargetReview> loadByProjectId(ProjectTargetReviewRepository repository, Long projectId) {
        return repository.findByProject_IdAndDeletedTimeIsNull(projectId).stream()
            .peek(item -> item.repository = repository)
            .collect(Collectors.toList());
    }

    //////////////////////////////////
    //// checker
    //////////////////////////////////

    //////////////////////////////////
    //// modifier
    //////////////////////////////////
    public void confirmOff() {
        if (this.confirmed.equals(Boolean.FALSE)) {
            throw new IllegalRequestException("project.target.review.already-not-confirmed", "이미 확정 취소된 검토입니다.");
        }
        this.confirmed = Boolean.FALSE;
        this.updatedTime = LocalDateTime.now();
        this.save();
    }

    public void confirmOn() {
        if (this.confirmed.equals(Boolean.TRUE)) {
            throw new IllegalRequestException("project.target.review.already-confirmed", "이미 확정된 검토입니다.");
        }
        this.repository.findByProject_IdAndConfirmedIsTrueAndDeletedTimeIsNull(this.project.getId())
            .ifPresent(ProjectTargetReview::confirmOff);
        this.confirmed = Boolean.TRUE;
        this.updatedTime = LocalDateTime.now();
        this.save();
    }

    private void save() {
        repository.save(this);
    }
}
