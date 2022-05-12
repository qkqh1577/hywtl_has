package com.howoocast.hywtl_has.personnel.parameter;

import com.howoocast.hywtl_has.common.parameter.CustomParameter;
import com.howoocast.hywtl_has.personnel.domain.PersonnelAcademic;
import java.time.LocalDate;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Setter
public class PersonnelAcademicParameter extends CustomParameter<PersonnelAcademic> {

    @NotBlank(message = "personnel.academic.academy-name.not-blank")
    private String academyName;

    @NotBlank(message = "personnel.academic.major.not-blank")
    private String major;

    private String degree;

    private String grade;

    @NotNull(message = "personnel.academic.start-date.not-null")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @NotNull(message = "personnel.academic.end-date.not-null")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    @NotBlank(message = "personnel.academic.state.not-blank")
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
