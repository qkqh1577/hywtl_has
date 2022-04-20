package com.howoocast.hywtl_has.personnel.view;

import com.howoocast.hywtl_has.personnel.domain.PersonnelCareer;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonnelCareerView {

    private String companyName;
    private LocalDate startDate;
    private LocalDate endDate;
    private String majorJob;

    public static PersonnelCareerView assemble(PersonnelCareer source) {
        PersonnelCareerView target = new PersonnelCareerView();
        target.companyName = source.getCompanyName();
        target.startDate = source.getStartDate();
        target.endDate = source.getEndDate();
        target.majorJob = source.getMajorJob();
        return target;
    }
}
