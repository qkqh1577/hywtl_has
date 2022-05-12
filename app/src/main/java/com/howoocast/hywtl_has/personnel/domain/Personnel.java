package com.howoocast.hywtl_has.personnel.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.user.domain.User;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Slf4j
@Getter
@Entity
@Table(name = "personnel")
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update personnel set deleted_at = now(), deleted_by = (select u.id from User u where u.username = #{#principal.username}) where id=?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Personnel extends CustomEntity {

    @JsonBackReference
    @OneToOne
    @NotNull
    @JoinColumn
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

    //////////////////////////////////
    //// constructor
    //////////////////////////////////
    private Personnel(User user) {
        this.user = user;
    }

    //////////////////////////////////
    //// builder
    //////////////////////////////////
    public static Personnel of(User user) {
        return new Personnel(user);
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
    }
}
