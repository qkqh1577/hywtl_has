package com.howoocast.hywtl_has.personnel.view;

import com.howoocast.hywtl_has.personnel.domain.PersonnelAcademic;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonnelAcademicView {

    private String academyName;
    private String major;
    private String degree;
    private String grade;
    private LocalDate startDate;
    private LocalDate endDate;
    private String state;

    public static PersonnelAcademicView assemble(PersonnelAcademic source) {
        PersonnelAcademicView target = new PersonnelAcademicView();
        target.academyName = source.getAcademyName();
        target.major = source.getMajor();
        target.degree = source.getDegree();
        target.grade = source.getGrade();
        target.startDate = source.getStartDate();
        target.endDate = source.getEndDate();
        target.state = source.getState();
        return target;
    }
}
