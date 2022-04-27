package com.howoocast.hywtl_has.project.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;

@Entity
@Getter
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @OneToOne
    @JoinColumn
    private ProjectBasic basic;

    @OneToOne
    @JoinColumn
    private ProjectBuilding building;

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
    private ProjectRepository repository;

    //////////////////////////////////
    //// constructor
    //////////////////////////////////
    protected Project() {
        this.createdTime = LocalDateTime.now();
        this.updatedTime = this.createdTime;
    }

    protected Project(Long id) {
        this.id = id;
    }

    protected Project(ProjectBasic basic) {
        this();
        this.basic = basic;
    }

    //////////////////////////////////
    //// getter - setter
    //////////////////////////////////

    //////////////////////////////////
    //// builder
    //////////////////////////////////
    public static Project of(
        ProjectRepository repository,
        ProjectBasic basic
    ) {
        Project instance = new Project(
            basic
        );
        instance.repository = repository;
        return repository.save(instance);
    }

    //////////////////////////////////
    //// finder
    //////////////////////////////////
    public static Project load(
        ProjectRepository repository,
        Long id
    ) {
        Project instance = repository.findByIdAndDeletedTimeIsNull(id)
            .orElseThrow(NotFoundException::new);
        instance.repository = repository;
        return instance;
    }

    //////////////////////////////////
    //// checker
    //////////////////////////////////

    //////////////////////////////////
    //// modifier
    //////////////////////////////////
    public void change(ProjectBasic basic) {
        this.basic = basic;
        this.save();
    }

    public void change(ProjectBuilding building) {
        this.building = building;
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
