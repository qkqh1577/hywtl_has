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
    @Column(nullable = false, unique = true)
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

    private String clientName; // 업체명

    @Column(name = "is_client_lh")
    private Boolean isClientLH; // 업체 LH 여부

    private String clientManager; // 업체 담당자

    private String clientPhone; // 업체 담당자 핸드폰

    private String clientEmail; // 업체 담당자 이메일

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
        instance.name = name;
        instance.code = code;
        instance.alias = alias;
        instance.salesManager = salesManager;
        instance.projectManager = projectManager;
        instance.status = ProjectStatus.TEMPLATE;
        instance.createdTime = LocalDateTime.now();
        instance.updatedTime = instance.createdTime;
        instance.repository = repository;
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
    public void change(
        String name,
        String code,
        String alias,
        User salesManager,
        User projectManager,
        String address,
        String purpose1,
        String purpose2,
        Double lotArea,
        Double totalArea,
        Integer buildingCount,
        Integer householdCount,
        Integer floorCount,
        Integer baseCount,
        String clientName,
        Boolean isClientLH,
        String clientManager,
        String clientPhone,
        String clientEmail
    ) {
        this.name = name;
        this.code = code;
        this.alias = alias;
        this.salesManager = salesManager;
        this.projectManager = projectManager;
        this.address = address;
        this.purpose1 = purpose1;
        this.purpose2 = purpose2;
        this.lotArea = lotArea;
        this.totalArea = totalArea;
        this.buildingCount = buildingCount;
        this.householdCount = householdCount;
        this.floorCount = floorCount;
        this.baseCount = baseCount;
        this.clientName = clientName;
        this.isClientLH = isClientLH;
        this.clientManager = clientManager;
        this.clientPhone = clientPhone;
        this.clientEmail = clientEmail;
        this.updatedTime = LocalDateTime.now();
        this.save();
    }

    public void save() {
        repository.save(this);
    }
}
