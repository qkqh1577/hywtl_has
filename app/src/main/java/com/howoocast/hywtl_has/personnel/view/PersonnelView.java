package com.howoocast.hywtl_has.personnel.view;

import com.howoocast.hywtl_has.personnel.domain.Personnel;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonnelView {

    private PersonnelBasicView basic;

    private PersonnelCompanyView company;

    private List<PersonnelJobView> jobList;

    public static PersonnelView assemble(Personnel source) {
        PersonnelView target = new PersonnelView();
        target.basic = PersonnelBasicView.assemble(source.getBasic());
        target.company = PersonnelCompanyView.assemble(source.getCompany());
        target.jobList = source.getJobList().stream()
            .map(PersonnelJobView::assemble).collect(Collectors.toList());
        return target;
    }
}
