package com.howoocast.hywtl_has.personnel.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.howoocast.hywtl_has.personnel.repository.PersonnelRepository;
import com.howoocast.hywtl_has.user.domain.User;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Personnel {

    @Id
    private Long id; // share user id

    @SuppressWarnings("unused")
    @Getter(AccessLevel.NONE)
    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "id")
    private User user;

    @NotNull
    @Embedded
    private PersonnelBasic basic;

    @NotNull
    @Embedded
    private PersonnelCompany company;

    @OneToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private List<PersonnelJob> jobList; // 직함 목록

    @ElementCollection
    private List<PersonnelAcademic> academicList; // 학력 목록

    @ElementCollection
    private List<PersonnelCareer> careerList; // 경력 목록

    // 경력 - 리스트
    // 면허 - 리스트
    // 어학 - 리스트

    @NotNull
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdTime;

    @SuppressWarnings("unused")
    @Column(insertable = false)
    private LocalDateTime deletedTime;

    public static Personnel of(
        PersonnelRepository repository,
        Long id,
        PersonnelBasic basic,
        PersonnelCompany company,
        List<PersonnelJob> jobList,
        List<PersonnelAcademic> academicList,
        List<PersonnelCareer> careerList
    ) {
        Personnel instance = repository.findById(id).orElse(new Personnel(id));
        instance.basic = basic;
        instance.company = company;
        instance.jobList = jobList;
        instance.academicList = academicList;
        instance.careerList = careerList;
        instance.createdTime = LocalDateTime.now();
        return repository.save(instance);
    }

    private Personnel(Long id) {
        this.id = id;
    }
}
