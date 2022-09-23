package com.howoocast.hywtl_has.personnel.parameter;

import com.howoocast.hywtl_has.personnel.domain.Personnel;
import java.util.List;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonnelParameter {

    @NotNull(message = Personnel.KEY + ".basic.not_null")
    private PersonnelBasicParameter basic;

    @NotNull(message = Personnel.KEY + ".company.not_null")
    private PersonnelCompanyParameter company;

    @NotEmpty(message = Personnel.KEY + ".job_list.not_empty")
    private List<PersonnelJobParameter> jobList;

    private List<PersonnelAcademicParameter> academicList;

    private List<PersonnelCareerParameter> careerList;

    private List<PersonnelLicenseParameter> licenseList;

    private List<PersonnelLanguageParameter> languageList;

}
