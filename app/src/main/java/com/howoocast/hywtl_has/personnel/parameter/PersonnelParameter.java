package com.howoocast.hywtl_has.personnel.parameter;

import java.util.List;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonnelParameter {

    @NotNull(message = "personnel.id.not_null")
    private Long id;

    @NotNull(message = "personnel.basic.not_null")
    private PersonnelBasicParameter basic;

    @NotNull(message = "personnel.company.not_null")
    private PersonnelCompanyParameter company;

    @NotEmpty(message = "personnel.job.list.not_empty")
    private List<PersonnelJobParameter> jobList;

    private List<PersonnelAcademicParameter> academicList;

    private List<PersonnelCareerParameter> careerList;

    private List<PersonnelLicenseParameter> licenseList;

    private List<PersonnelLanguageParameter> languageList;

}
