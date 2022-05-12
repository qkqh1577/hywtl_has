package com.howoocast.hywtl_has.personnel.parameter;

import com.howoocast.hywtl_has.common.parameter.CustomParameter;
import com.howoocast.hywtl_has.personnel.domain.PersonnelLicense;
import java.time.LocalDate;
import javax.validation.constraints.NotBlank;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Setter
public class PersonnelLicenseParameter extends CustomParameter<PersonnelLicense> {

    @NotBlank(message = "personnel.license.name.not-blank")
    private String name;

    private String type;

    @NotBlank(message = "personnel.license.organization-name.not-blank")
    private String organizationName;

    @NotBlank(message = "personnel.license.qualified-number.not-blank")
    private String qualifiedNumber;

    @NotBlank(message = "personnel.license.qualified-date.not-null")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate qualifiedDate;

    private String memo;

    @Override
    public PersonnelLicense build() {
        return PersonnelLicense.of(
            name,
            type,
            organizationName,
            qualifiedNumber,
            qualifiedDate,
            memo
        );
    }
}
