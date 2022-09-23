package com.howoocast.hywtl_has.personnel.view;

import com.howoocast.hywtl_has.common.util.ListConvertor;
import com.howoocast.hywtl_has.department.view.DepartmentView;
import com.howoocast.hywtl_has.personnel.domain.Personnel;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import lombok.Getter;

@Getter
public class PersonnelView {

    private Long id;
    private Long userId;
    private String email;
    private String userStatus;
    private String name;
    private PersonnelBasicView basic;
    private PersonnelCompanyView company;
    private List<PersonnelJobView> jobList;
    private List<PersonnelAcademicView> academicList;
    private List<PersonnelCareerView> careerList;
    private List<PersonnelLicenseView> licenseList;
    private List<PersonnelLanguageView> languageList;

    public static PersonnelView assemble(Personnel source) {
        PersonnelView target = new PersonnelView();
        target.id = source.getId();
        target.name = source.getUser().getName();
        target.userId = source.getUser().getId();
        target.email = source.getUser().getEmail();
        // TODO: 사용자 계정 상태
        target.userStatus = "사용";
        target.company = PersonnelCompanyView.assemble(source.getCompany());
        target.academicList = ListConvertor.make(source.getAcademicList(), PersonnelAcademicView::assemble);
        target.careerList = ListConvertor.make(source.getCareerList(), PersonnelCareerView::assemble);
        target.licenseList = ListConvertor.make(source.getLicenseList(), PersonnelLicenseView::assemble);
        target.languageList = ListConvertor.make(source.getLanguageList(), PersonnelLanguageView::assemble);

        if (Objects.isNull(source.getBasic())) {
            target.basic = new PersonnelBasicView();
            target.basic.setEngName(source.getUser().getEnglishName());
            target.basic.setBirthDate(source.getUser().getBirthDate());
            target.basic.setSex(source.getUser().getSex());
            target.basic.setAddress(source.getUser().getAddress());
            target.basic.setPhone(source.getUser().getMobilePhone());
            target.basic.setEmergencyPhone(source.getUser().getEmergencyPhone());
            target.basic.setRelationship(source.getUser().getRelationship());
            target.basic.setPersonalEmail(source.getUser().getPrivateEmail());
        } else {
            target.basic = PersonnelBasicView.assemble(source.getBasic());
        }
        if (Objects.isNull(source.getJobList()) || source.getJobList().isEmpty()) {

            target.jobList = new ArrayList<>();
            PersonnelJobView job = new PersonnelJobView();
            job.setDepartment(DepartmentView.assemble(source.getUser().getDepartment()));
            target.jobList.add(job);
        } else {
            target.jobList = ListConvertor.make(source.getJobList(), PersonnelJobView::assemble);

        }
        return target;
    }
}
