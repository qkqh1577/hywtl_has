package com.howoocast.hywtl_has.personnel.parameter;

import com.howoocast.hywtl_has.common.parameter.CustomParameter;
import com.howoocast.hywtl_has.personnel.domain.PersonnelAcademic;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
public class PersonnelAcademicParameter extends CustomParameter<PersonnelAcademic> {

    private String academyName;

    private String major;

    private String degree;

    private String grade;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    private String state;

    public PersonnelAcademic build() {
        return PersonnelAcademic.of(
            academyName,
            major,
            degree,
            state,
            grade,
            startDate,
            endDate
        );
    }
}
