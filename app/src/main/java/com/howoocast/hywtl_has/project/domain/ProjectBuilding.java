package com.howoocast.hywtl_has.project.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.howoocast.hywtl_has.project.repository.ProjectBuildingRepository;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;

@Entity
@Getter
public class ProjectBuilding {

    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter(AccessLevel.NONE)
    @JsonIgnore
    @OneToOne(mappedBy = "building")
    private Project project;

    // TODO: 주소 컴포넌트 개발 이후 변경
    private String address;

    private String purpose1; // 건물 용도 1

    private String purpose2; // 건물 용도 2

    private Double lotArea; // 대지면적

    private Double totalArea; // 연면적

    private Integer buildingCount; // 총 동 수

    private Integer householdCount; // 건물 당 세대 수

    private Integer floorCount; // 층 수

    private Integer baseCount; // 지하층 수

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
    protected ProjectBuildingRepository repository;

    //////////////////////////////////
    //// constructor
    //////////////////////////////////
    protected ProjectBuilding() {
        this.createdTime = LocalDateTime.now();
        this.updatedTime = this.createdTime;
    }

    //////////////////////////////////
    //// getter - setter
    //////////////////////////////////

    //////////////////////////////////
    //// builder
    //////////////////////////////////

    //////////////////////////////////
    //// finder
    //////////////////////////////////
    public static ProjectBuilding load(ProjectBuildingRepository repository, Long projectId) {
        ProjectBuilding instance = repository.findByProject_IdAndDeletedTimeIsNull(projectId)
            .orElse(new ProjectBuilding());
        instance.repository = repository;
        return instance;
    }

    //////////////////////////////////
    //// checker
    //////////////////////////////////

    //////////////////////////////////
    //// modifier
    //////////////////////////////////
    public void change(
        String address,
        String purpose1,
        String purpose2,
        Double lotArea,
        Double totalArea,
        Integer buildingCount,
        Integer householdCount,
        Integer floorCount,
        Integer baseCount
    ) {
        this.address = address;
        this.purpose1 = purpose1;
        this.purpose2 = purpose2;
        this.lotArea = lotArea;
        this.totalArea = totalArea;
        this.buildingCount = buildingCount;
        this.householdCount = householdCount;
        this.floorCount = floorCount;
        this.baseCount = baseCount;
        this.updatedTime = LocalDateTime.now();
        this.save();
    }

    public void save() {
        repository.save(this);
    }
}
