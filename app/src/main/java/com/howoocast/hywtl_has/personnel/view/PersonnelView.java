package com.howoocast.hywtl_has.personnel.view;

import com.howoocast.hywtl_has.common.util.ListConvertor;
import com.howoocast.hywtl_has.personnel.domain.Personnel;
import java.util.List;
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

    private List<PersonnelLanguageView> languageList;

    public static PersonnelView assemble(Personnel source) {
        PersonnelView target = new PersonnelView();
        target.basic = PersonnelBasicView.assemble(source.getBasic());
        target.company = PersonnelCompanyView.assemble(source.getCompany());
        target.jobList = ListConvertor.make(source.getJobList(), PersonnelJobView::assemble);
        target.academicList = ListConvertor.make(source.getAcademicList(), PersonnelAcademicView::assemble);
        target.careerList = ListConvertor.make(source.getCareerList(), PersonnelCareerView::assemble);
        target.licenseList = ListConvertor.make(source.getLicenseList(), PersonnelLicenseView::assemble);
        target.languageList = ListConvertor.make(source.getLanguageList(), PersonnelLanguageView::assemble);
        return target;
    }
}
