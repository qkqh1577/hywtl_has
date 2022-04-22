package com.howoocast.hywtl_has.personnel.view;

import com.howoocast.hywtl_has.personnel.domain.Personnel;
import java.util.List;
import java.util.Optional;
import lombok.Getter;
import org.springframework.lang.Nullable;

@Getter
public class PersonnelListView {

    private Long id;

    private String name;

    private String email;

    private String username;

    private PersonnelBasicView basic;

    private PersonnelCompanyView company;

    private Integer jobCount;

    private Integer academicCount;

    private Integer careerCount;

    private Integer licenseCount;

    private Integer languageCount;

    public static PersonnelListView assemble(Personnel source) {
        PersonnelListView target = new PersonnelListView();
        target.id = Optional.ofNullable(source.getId()).orElse(source.getUser().getId());
        target.name = source.getUser().getName();
        target.email = source.getUser().getEmail();
        target.username = source.getUser().getUsername();
        target.basic = PersonnelBasicView.assemble(source.getBasic());
        target.company = PersonnelCompanyView.assemble(source.getCompany());
        target.jobCount = getSize(source.getJobList());
        target.academicCount = getSize(source.getAcademicList());
        target.careerCount = getSize(source.getCareerList());
        target.licenseCount = getSize(source.getLicenseList());
        target.languageCount = getSize(source.getLanguageList());
        return target;
    }

    @Nullable
    private static Integer getSize(@Nullable List<?> list) {
        return Optional.ofNullable(list).map(List::size).orElse(null);
    }
}
