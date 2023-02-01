package com.howoocast.hywtl_has.personnel.domain;

import java.time.LocalDate;
import javax.persistence.Embeddable;
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

    protected String companyName; // 근무처명

    protected LocalDate startDate; // 근무시작일

    protected LocalDate endDate; // 근무종료일

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
