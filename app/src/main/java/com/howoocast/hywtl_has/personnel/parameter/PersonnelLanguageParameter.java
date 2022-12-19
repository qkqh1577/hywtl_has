package com.howoocast.hywtl_has.personnel.parameter;

import com.howoocast.hywtl_has.common.parameter.CustomParameter;
import com.howoocast.hywtl_has.personnel.domain.PersonnelLanguage;
import java.time.LocalDate;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
@Getter
@Setter
public class PersonnelLanguageParameter extends CustomParameter<PersonnelLanguage> {

    @NotBlank(message = PersonnelLanguage.KEY + ".personnel_language_name.not_blank")
    private String name;

    @NotBlank(message = PersonnelLanguage.KEY + ".personnel_language_type.not_blank")
    private String type;

    private String grade;

    @NotBlank(message = PersonnelLanguage.KEY + ".personnel_language_organization_name.not_blank")
    private String organizationName;

    @NotNull(message = PersonnelLanguage.KEY + ".personnel_language_certified_date.not_null")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate certifiedDate;

    private String expiryPeriod;

    @Override
    public PersonnelLanguage build() {
        return PersonnelLanguage.of(
            name,
            type,
            grade,
            organizationName,
            certifiedDate,
            expiryPeriod
        );
    }
}
