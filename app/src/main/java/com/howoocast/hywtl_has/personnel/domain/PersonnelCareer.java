package com.howoocast.hywtl_has.personnel.domain;

import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Embeddable;
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
public class PersonnelCareer {

    public static final String KEY = "personnel_career";

    @NotBlank
    @Column(nullable = false)
    protected String companyName; // 근무처명

    @NotNull
    @Column(nullable = false)
    protected LocalDate startDate; // 근무시작일

    @NotNull
    @Column(nullable = false)
    protected LocalDate endDate; // 근무종료일

    @NotBlank
    @Column(nullable = false)
    protected String majorJob; // 주 업무

    public static PersonnelCareer of(
        String companyName,
        LocalDate startDate,
        LocalDate endDate,
        String majorJob
    ) {
        return new PersonnelCareer(
            companyName,
            startDate,
            endDate,
            majorJob
        );
    }
}
