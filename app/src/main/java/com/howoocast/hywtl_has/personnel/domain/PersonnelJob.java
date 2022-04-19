package com.howoocast.hywtl_has.personnel.domain;

import com.howoocast.hywtl_has.department.domain.Department;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class PersonnelJob {

    @NotNull
    @ManyToOne
    protected Department department; // 부서

    @NotBlank
    @Column(nullable = false)
    protected String jobTitle; // 직함 - 부서 내 호칭

    @NotBlank
    @Column(nullable = false)
    protected String jobType; // 직종 - 종사 계열. ex) 일반직, 연구직, 임원직

    @NotBlank
    @Column(nullable = false)
    protected String jobPosition; // 직위 - 직무 상의 서열. ex) 사원, 대리...

    protected String jobClass; // 직급 - 직위 내에서의 구분 단위. ex) n호봉, 주임, 책임...

    protected String jobDuty; // 직책, 부서 내 책임. ex) 팀장, 본부장, 실장...

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
}
