package com.howoocast.hywtl_has.project.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.howoocast.hywtl_has.common.domain.FileItem;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.project.repository.ProjectTargetDocumentRepository;
import com.howoocast.hywtl_has.user.domain.User;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectTargetDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @Getter(AccessLevel.NONE)
    @NotNull
    @ManyToOne
    private Project project;

    @NotNull
    @OneToOne
    @JoinColumn
    private FileItem fileItem;

    @NotNull
    @ManyToOne
    private User writer;
    private String memo;

    @NotNull
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdTime;

    @Column(insertable = false)
    private LocalDateTime updatedTime;

    @Column(insertable = false)
    private LocalDateTime deletedTime;

    @Getter(AccessLevel.NONE)
    @Transient
    private ProjectTargetDocumentRepository repository;

    //////////////////////////////////
    //// constructor
    //////////////////////////////////

    //////////////////////////////////
    //// getter - setter
    //////////////////////////////////

    //////////////////////////////////
    //// builder
    //////////////////////////////////
    public static ProjectTargetDocument of(
        ProjectTargetDocumentRepository repository,
        Project project,
        FileItem fileItem,
        User writer,
        String memo
    ) {
        ProjectTargetDocument instance = new ProjectTargetDocument();
        instance.project = project;
        instance.fileItem = fileItem;
        instance.writer = writer;
        instance.memo = memo;
        instance.createdTime = LocalDateTime.now();
        instance.repository = repository;
        instance.save();
        return instance;
    }

    //////////////////////////////////
    //// finder
    //////////////////////////////////
    public static ProjectTargetDocument load(ProjectTargetDocumentRepository repository, Long id) {
        ProjectTargetDocument instance = repository
            .findByIdAndDeletedTimeIsNull(id)
            .orElseThrow(() -> new NotFoundException("project.target.document", id));
        instance.repository = repository;
        return instance;
    }

    public static List<ProjectTargetDocument> loadByProjectId(
        ProjectTargetDocumentRepository repository,
        Long projectId
    ) {
        return repository
            .findByProject_IdAndDeletedTimeIsNull(projectId).stream()
            .peek(item -> item.repository = repository)
            .collect(Collectors.toList());
    }

    //////////////////////////////////
    //// checker
    //////////////////////////////////

    //////////////////////////////////
    //// modifier
    //////////////////////////////////
    public void change(
        String memo
    ) {
        this.memo = memo;
        this.updatedTime = LocalDateTime.now();
        this.save();
    }

    private void save() {
        repository.save(this);
    }
}
