package com.howoocast.hywtl_has.project_comment.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne
    private Project project;

    @ManyToOne
    private User writer;

    @NotBlank
    @Column(nullable = false)
    private String description;

    @NotNull
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdTime;

    @NotNull
    @Column(nullable = false)
    private LocalDateTime updatedTime;

    @Column(insertable = false)
    private LocalDateTime deletedTime;

    @Getter(AccessLevel.NONE)
    @JsonIgnore
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
        instance.createdTime = LocalDateTime.now();
        instance.updatedTime = instance.createdTime;
        return repository.save(instance);
    }

    //////////////////////////////////
    //// finder
    //////////////////////////////////
    public static ProjectComment load(
        ProjectCommentRepository repository,
        Long id
    ) {
        ProjectComment instance = repository.findByIdAndDeletedTimeIsNull(id).orElseThrow(NotFoundException::new);
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
        this.updatedTime = LocalDateTime.now();
        this.save();
    }

    public void delete() {
        this.deletedTime = LocalDateTime.now();
        this.save();
    }

    public void save() {
        repository.save(this);
    }
}
