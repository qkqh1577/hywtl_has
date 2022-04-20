package com.howoocast.hywtl_has.personnel.parameter;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
public class PersonnelAcademicParameter {

    private String academyName;
    private String major;
    private String degree;
    private String grade;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;
    private String state;
}
