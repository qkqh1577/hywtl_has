package com.howoocast.hywtl_has.personnel.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.user.domain.User;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;

@Slf4j
@Getter
@Entity
@Table(name = Personnel.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Personnel extends CustomEntity {

    public static final String KEY = "personnel";

    @OneToOne
    @JoinColumn
    private User user;

    @OneToOne(cascade = CascadeType.ALL)
    private PersonnelBasic basic;

    @OneToOne(cascade = CascadeType.ALL)
    private PersonnelCompany company;

    @OneToMany(cascade = CascadeType.ALL)
    private List<PersonnelJob> jobList; // 직함 목록

    @ElementCollection
    private List<PersonnelAcademic> academicList; // 학력 목록

    @ElementCollection
    private List<PersonnelCareer> careerList; // 경력 목록

    @ElementCollection
    private List<PersonnelLicense> licenseList; // 면허 목록

    @ElementCollection
    private List<PersonnelLanguage> languageList; // 어학 자격 목록

    private Personnel(User user) {
        this.user = user;
    }

    public static Personnel of(User user) {
        return new Personnel(user);
    }

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
