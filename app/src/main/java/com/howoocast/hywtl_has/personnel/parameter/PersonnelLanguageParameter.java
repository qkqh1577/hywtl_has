package com.howoocast.hywtl_has.personnel.parameter;

import com.howoocast.hywtl_has.common.parameter.CustomParameter;
import com.howoocast.hywtl_has.personnel.domain.PersonnelLanguage;
import java.time.LocalDate;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Setter
public class PersonnelLanguageParameter extends CustomParameter<PersonnelLanguage> {

    @NotBlank(message = "personnel.language.name.not_blank")
    private String name;

    @NotBlank(message = "personnel.language.type.not_blank")
    private String type;

    private String grade;

    @NotBlank(message = "personnel.language.organization_name.not_blank")
    private String organizationName;

    @NotNull(message = "personnel.language.certified_date.not_null")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate certifiedDate;

    private String expiryPeriod;

    private String trainingPeriod;

    @Override
    public PersonnelLanguage build() {
        return PersonnelLanguage.of(
            name,
            type,
            grade,
            organizationName,
            certifiedDate,
            expiryPeriod,
            trainingPeriod
        );
    }
}
