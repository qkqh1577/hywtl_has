package com.howoocast.hywtl_has.project.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.project.common.ProjectStatus;
import com.howoocast.hywtl_has.project.repository.ProjectBasicRepository;
import com.howoocast.hywtl_has.user.domain.User;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectBasic {

    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter(AccessLevel.NONE)
    @JsonIgnore
    @OneToOne(mappedBy = "basic")
    private Project project;

    @NotBlank
    @Column(nullable = false, updatable = false, unique = true)
    private String code; // 코드

    @NotBlank
    @Column(nullable = false)
    private String name; // 이름

    private String alias; // 별칭

    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(nullable = false)
    private ProjectStatus status; // 상태

    @ManyToOne
    @NotNull
    private User salesManager; // 영업 당담자

    @ManyToOne
    @NotNull
    private User projectManager; // 담당 PM

    @NotNull
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdTime;

    @NotNull
    @Column(nullable = false)
    private LocalDateTime updatedTime;

    @Getter(AccessLevel.NONE)
    @Column(insertable = false)
    private LocalDateTime deletedTime;

    @Getter(AccessLevel.NONE)
    @JsonIgnore
    @Transient
    protected ProjectBasicRepository repository;

    //////////////////////////////////
    //// constructor
    //////////////////////////////////

    //////////////////////////////////
    //// getter - setter
    //////////////////////////////////


    //////////////////////////////////
    //// builder
    //////////////////////////////////
    public static ProjectBasic of(
        ProjectBasicRepository repository,
        String name,
        String code,
        String alias,
        User salesManager,
        User projectManager
    ) {
        ProjectBasic instance = new ProjectBasic();
        instance.set(
            name,
            code,
            alias,
            salesManager,
            projectManager
        );
        instance.repository = repository;
        instance.status = ProjectStatus.TEMPLATE;
        instance.createdTime = LocalDateTime.now();
        instance.updatedTime = instance.createdTime;
        return repository.save(instance);
    }

    //////////////////////////////////
    //// finder
    //////////////////////////////////
    public static ProjectBasic load(ProjectBasicRepository repository, Long projectId) {
        ProjectBasic projectBasic = repository.findByProject_IdAndDeletedTimeIsNull(projectId)
            .orElseThrow(NotFoundException::new);
        projectBasic.repository = repository;
        return projectBasic;
    }

    //////////////////////////////////
    //// checker
    //////////////////////////////////

    //////////////////////////////////
    //// modifier
    //////////////////////////////////
    private void set(
        String name,
        String code,
        String alias,
        User salesManager,
        User projectManager
    ) {
        this.name = name;
        this.code = code;
        this.alias = alias;
        this.salesManager = salesManager;
        this.projectManager = projectManager;
    }

    public void change(
        String name,
        String code,
        String alias,
        User salesManager,
        User projectManager) {
        this.set(
            name,
            code,
            alias,
            salesManager,
            projectManager
        );
        this.updatedTime = LocalDateTime.now();
        this.save();
    }

    public void save() {
        repository.save(this);
    }
}
