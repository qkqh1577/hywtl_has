package com.howoocast.hywtl_has.personnel.parameter;

import com.howoocast.hywtl_has.personnel.domain.Personnel;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

@Getter
@Setter
@Validated
public class PersonnelParameter {

    @Valid
    @NotNull(message = Personnel.KEY + ".basic.not_null")
    private PersonnelBasicParameter basic;

    @Valid
    @NotNull(message = Personnel.KEY + ".hired_info.not_null")
    private PersonnelCompanyParameter company;

    @Valid
    @NotEmpty(message = Personnel.KEY + ".job_list.not_empty")
    private List<PersonnelJobParameter> jobList;

    @Valid
    private List<PersonnelAcademicParameter> academicList;
    @Valid
    private List<PersonnelCareerParameter> careerList;
    @Valid
    private List<PersonnelLicenceParameter> licenceList;
    @Valid
    private List<PersonnelLanguageParameter> languageList;

}
