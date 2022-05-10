package com.howoocast.hywtl_has.project_comment.domain;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project_comment.repository.ProjectCommentRepository;
import com.howoocast.hywtl_has.user.domain.User;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
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
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Project project;

    @ManyToOne
    private User writer;

    @NotBlank
    @Column(nullable = false)
    private String description;

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
    private ProjectCommentRepository repository;

    //////////////////////////////////
    //// constructor
    //////////////////////////////////
    protected ProjectComment(
        Project project,
        User writer,
        String description
    ) {
        this.project = project;
        this.writer = writer;
        this.description = description;
    }

    //////////////////////////////////
    //// getter - setter
    //////////////////////////////////

    //////////////////////////////////
    //// builder
    //////////////////////////////////
    public static ProjectComment of(
        ProjectCommentRepository repository,
        Project project,
        User writer,
        String description
    ) {
        ProjectComment instance = new ProjectComment(
            project,
            writer,
            description
        );
        instance.repository = repository;
        return repository.save(instance);
    }

    //////////////////////////////////
    //// finder
    //////////////////////////////////
    public static ProjectComment load(
        ProjectCommentRepository repository,
        Long id
    ) {
        ProjectComment instance = repository
            .findByIdAndDeletedAtIsNull(id)
            .orElseThrow(() -> new NotFoundException("project-comment", id));
        instance.repository = repository;
        return instance;
    }

    //////////////////////////////////
    //// checker
    //////////////////////////////////

    //////////////////////////////////
    //// modifier
    //////////////////////////////////
    public void changeDescription(String description) {
        this.description = description;
        this.save();
    }

    public void delete() {
        this.deletedAt = LocalDateTime.now();
        this.save();
    }

    public void save() {
        repository.save(this);
    }
}
