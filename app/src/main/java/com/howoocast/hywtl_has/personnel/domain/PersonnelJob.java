package com.howoocast.hywtl_has.personnel.domain;

import com.howoocast.hywtl_has.department.domain.Department;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PersonnelJob {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    private Department department; // 부서

    @NotBlank
    @Column(nullable = false)
    private String jobTitle; // 직함 - 부서 내 호칭

    @NotBlank
    @Column(nullable = false)
    private String jobType; // 직종 - 종사 계열. ex) 일반직, 연구직, 임원직

    @NotBlank
    @Column(nullable = false)
    private String jobPosition; // 직위 - 직무 상의 서열. ex) 사원, 대리...

    private String jobClass; // 직급 - 직위 내에서의 구분 단위. ex) n호봉, 주임, 책임...

    private String jobDuty; // 직책, 부서 내 책임. ex) 팀장, 본부장, 실장...

    public static PersonnelJob of(
        Department department,
        String jobTitle,
        String jobType,
        String jobPosition,
        String jobClass,
        String jobDuty
    ) {
        return new PersonnelJob(
            department,
            jobTitle,
            jobType,
            jobPosition,
            jobClass,
            jobDuty
        );
    }

    private PersonnelJob(
        Department department,
        String jobTitle,
        String jobType,
        String jobPosition,
        String jobClass,
        String jobDuty
    ) {
        this.department = department;
        this.jobTitle = jobTitle;
        this.jobType = jobType;
        this.jobPosition = jobPosition;
        this.jobClass = jobClass;
        this.jobDuty = jobDuty;
    }
}
