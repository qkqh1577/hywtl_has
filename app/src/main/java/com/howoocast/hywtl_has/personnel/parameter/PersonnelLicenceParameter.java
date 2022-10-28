package com.howoocast.hywtl_has.personnel.parameter;

import com.howoocast.hywtl_has.common.parameter.CustomParameter;
import com.howoocast.hywtl_has.personnel.domain.PersonnelLicence;
import java.time.LocalDate;
import javax.validation.constraints.NotBlank;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Setter
public class PersonnelLicenceParameter extends CustomParameter<PersonnelLicence> {

    @NotBlank(message = PersonnelLicence.KEY + ".name.not_blank")
    private String name;

    private String type;

    @NotBlank(message = PersonnelLicence.KEY + ".organization_name.not_blank")
    private String organizationName;

    @NotBlank(message = PersonnelLicence.KEY + ".qualified_number.not_blank")
    private String qualifiedNumber;

    @NotBlank(message = PersonnelLicence.KEY + ".qualified_date.not_null")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate qualifiedDate;

    private String note;

    @Override
    public PersonnelLicence build() {
        return PersonnelLicence.of(
            name,
            type,
            organizationName,
            qualifiedNumber,
            qualifiedDate,
            note
        );
    }
}
