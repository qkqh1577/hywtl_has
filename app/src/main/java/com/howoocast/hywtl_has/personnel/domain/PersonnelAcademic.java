package com.howoocast.hywtl_has.personnel.domain;

import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class PersonnelAcademic {

    @NotBlank
    @Column(nullable = false)
    protected String academyName; // 교육기관명

    @NotBlank
    @Column(nullable = false)
    protected String major; // 전공

    protected String degree; // 학위

    @NotBlank
    @Column(nullable = false)
    protected String state; // 상태 [졸업, 휴학, 재학, 중퇴]

    protected String grade; // 학점 (숫자, 수료, 이수 등)

    protected LocalDate startDate; // 시작일

    protected LocalDate endDate; // 종료일


    public static PersonnelAcademic of(
        String academyName,
        String major,
        String degree,
        String grade,
        String state,
        LocalDate startDate,
        LocalDate endDate
    ) {
        return new PersonnelAcademic(
            academyName,
            major,
            degree,
            grade,
            state,
            startDate,
            endDate
        );
    }
}
