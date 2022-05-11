package com.howoocast.hywtl_has.personnel.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.department.domain.Department;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
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
@Table(name = "personnel_job")
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update personnel_job set deleted_at = now(), deleted_by = (select u.id from User u where u.username = #{#principal.username}) where id=?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PersonnelJob extends CustomEntity {

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
