package com.howoocast.hywtl_has.personnel.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.department.domain.Department;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;

@Slf4j
@Getter
@Entity
@Table(name = PersonnelJob.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PersonnelJob extends CustomEntity {

    public static final String KEY = "personnel_job";

    @ManyToOne
    private Department department; // 조직

    private String jobTitle; // 직함 - 조직 내 호칭

    private String jobType; // 직종 - 종사 계열. ex) 일반직, 연구직, 임원직

    private String jobPosition; // 직위 - 직무 상의 서열. ex) 사원, 대리...

    private String jobClass; // 직급 - 직위 내에서의 구분 단위. ex) n호봉, 주임, 책임...

    private String jobDuty; // 직책, 조직 내 책임. ex) 팀장, 본부장, 실장...

    /**
     * 대표 노출 여부
     */
    @NotNull
    @Column(nullable = false)
    private Boolean isRepresentative;

    private PersonnelJob(
        Department department,
        String jobTitle,
        String jobType,
        String jobPosition,
        String jobClass,
        String jobDuty,
        Boolean isRepresentative
    ) {
        this.department = department;
        this.jobTitle = jobTitle;
        this.jobType = jobType;
        this.jobPosition = jobPosition;
        this.jobClass = jobClass;
        this.jobDuty = jobDuty;
        this.isRepresentative = isRepresentative;
    }

    public static PersonnelJob of(
        Department department,
        String jobTitle,
        String jobType,
        String jobPosition,
        String jobClass,
        String jobDuty,
        Boolean isRepresentative
    ) {
        return new PersonnelJob(
            department,
            jobTitle,
            jobType,
            jobPosition,
            jobClass,
            jobDuty,
            isRepresentative
        );
    }
}
