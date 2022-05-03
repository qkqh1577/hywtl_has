package com.howoocast.hywtl_has.personnel.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.personnel.repository.PersonnelRepository;
import com.howoocast.hywtl_has.user.domain.User;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Personnel {

    @Id
    private Long id;

    @OneToOne
    @NotNull
    @JoinColumn(name = "id")
    private User user;

    @NotNull
    @Embedded
    private PersonnelBasic basic;

    @NotNull
    @Embedded
    private PersonnelCompany company;

    @JsonManagedReference
    @OneToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private List<PersonnelJob> jobList; // 직함 목록

    @ElementCollection
    private List<PersonnelAcademic> academicList; // 학력 목록

    @ElementCollection
    private List<PersonnelCareer> careerList; // 경력 목록

    @ElementCollection
    private List<PersonnelLicense> licenseList; // 면허 목록

    @ElementCollection
    private List<PersonnelLanguage> languageList; // 어학 자격 목록

    @NotNull
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdTime;

    @Column(insertable = false)
    private LocalDateTime updatedTime;

    @Getter(AccessLevel.NONE)
    @Transient
    private PersonnelRepository repository;

    //////////////////////////////////
    //// constructor
    //////////////////////////////////
    private Personnel(User user) {
        this.id = user.getId();
        this.user = user;
    }

    //////////////////////////////////
    //// builder
    //////////////////////////////////


    //////////////////////////////////
    //// finder
    //////////////////////////////////
    public static Personnel load(
        PersonnelRepository repository,
        Long id
    ) {
        Personnel instance = repository
            .findByIdAndDeletedTimeIsNull(id)
            .orElseThrow(() -> new NotFoundException("personnel", id));
        instance.repository = repository;
        return instance;
    }

    public static Personnel find(
        PersonnelRepository repository,
        User user
    ) {
        Personnel instance = repository
            .findByIdAndDeletedTimeIsNull(user.getId())
            .orElse(new Personnel(user));
        instance.repository = repository;
        return instance;
    }

    //////////////////////////////////
    //// modifier
    //////////////////////////////////
    public void change(
        PersonnelBasic basic,
        PersonnelCompany company,
        List<PersonnelJob> jobList,
        List<PersonnelAcademic> academicList,
        List<PersonnelCareer> careerList,
        List<PersonnelLicense> licenseList,
        List<PersonnelLanguage> languageList
    ) {
        this.basic = basic;
        this.company = company;
        this.jobList = jobList;
        this.academicList = academicList;
        this.careerList = careerList;
        this.licenseList = licenseList;
        this.languageList = languageList;
        if (Objects.isNull(this.createdTime)) {
            this.createdTime = LocalDateTime.now();
        } else {
            this.updatedTime = LocalDateTime.now();
        }
    }


}
