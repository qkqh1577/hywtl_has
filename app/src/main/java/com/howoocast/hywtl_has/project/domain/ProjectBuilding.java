package com.howoocast.hywtl_has.project.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.howoocast.hywtl_has.common.domain.Address;
import com.howoocast.hywtl_has.project.repository.ProjectBuildingRepository;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectBuilding {

    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter(AccessLevel.NONE)
    @JsonIgnore
    @OneToOne(mappedBy = "building")
    private Project project;

    @Embedded
    @NotNull
    private Address address;

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

    //////////////////////////////////
    //// getter - setter
    //////////////////////////////////

    //////////////////////////////////
    //// builder
    //////////////////////////////////
    public static ProjectBuilding of(
        ProjectBuildingRepository repository,
        Address address,
        String purpose1,
        String purpose2,
        Double lotArea,
        Double totalArea,
        Integer buildingCount,
        Integer householdCount,
        Integer floorCount,
        Integer baseCount
    ) {
        ProjectBuilding instance = new ProjectBuilding();
        instance.set(
            address,
            purpose1,
            purpose2,
            lotArea,
            totalArea,
            buildingCount,
            householdCount,
            floorCount,
            baseCount
        );
        instance.repository = repository;
        instance.createdTime = LocalDateTime.now();
        instance.updatedTime = instance.createdTime;
        return repository.save(instance);
    }

    //////////////////////////////////
    //// finder
    //////////////////////////////////

    //////////////////////////////////
    //// checker
    //////////////////////////////////

    //////////////////////////////////
    //// modifier
    //////////////////////////////////
    private void set(
        Address address,
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
    }

    public void change(
        Address address,
        String purpose1,
        String purpose2,
        Double lotArea,
        Double totalArea,
        Integer buildingCount,
        Integer householdCount,
        Integer floorCount,
        Integer baseCount
    ) {
        this.set(
            address,
            purpose1,
            purpose2,
            lotArea,
            totalArea,
            buildingCount,
            householdCount,
            floorCount,
            baseCount
        );
        this.updatedTime = LocalDateTime.now();
        this.save();
    }

    public void save() {
        repository.save(this);
    }
}
