package com.howoocast.hywtl_has.project.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.howoocast.hywtl_has.common.domain.Address;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectBuilding {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @OneToOne
    @JoinColumn
    @NotNull
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

    @Column(insertable = false)
    private LocalDateTime deletedTime;

}
