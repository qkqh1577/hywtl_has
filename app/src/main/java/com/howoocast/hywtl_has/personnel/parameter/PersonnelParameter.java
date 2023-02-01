package com.howoocast.hywtl_has.personnel.parameter;

import java.util.List;
import lombok.Getter;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

@Getter
@Setter
@Validated
public class PersonnelParameter {

    private PersonnelBasicParameter basic;

    private PersonnelCompanyParameter company;

    private List<PersonnelJobParameter> jobList;

    private List<PersonnelAcademicParameter> academicList;
    private List<PersonnelCareerParameter> careerList;
    private List<PersonnelLicenceParameter> licenceList;
    private List<PersonnelLanguageParameter> languageList;

}
