package com.howoocast.hywtl_has.personnel.view;

import com.howoocast.hywtl_has.personnel.domain.Personnel;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonnelView {

    private PersonnelBasicView basic;

    private PersonnelCompanyView company;

    private List<PersonnelJobView> jobList;

    private List<PersonnelAcademicView> academicList;

    private List<PersonnelCareerView> careerList;

    private List<PersonnelLicenseView> licenseList;

    public static PersonnelView assemble(Personnel source) {
        PersonnelView target = new PersonnelView();
        target.basic = PersonnelBasicView.assemble(source.getBasic());
        target.company = PersonnelCompanyView.assemble(source.getCompany());
        target.jobList = source.getJobList().stream()
            .map(PersonnelJobView::assemble).collect(Collectors.toList());
        target.academicList = Optional.ofNullable(source.getAcademicList())
            .map(list -> list.stream().map(PersonnelAcademicView::assemble).collect(Collectors.toList()))
            .orElse(Collections.emptyList());
        target.careerList = Optional.ofNullable(source.getCareerList())
            .map(list -> list.stream().map(PersonnelCareerView::assemble).collect(Collectors.toList()))
            .orElse(Collections.emptyList());
        target.licenseList = Optional.ofNullable(source.getLicenseList())
            .map(list -> list.stream().map(PersonnelLicenseView::assemble).collect(Collectors.toList()))
            .orElse(Collections.emptyList());
        return target;
    }
}
