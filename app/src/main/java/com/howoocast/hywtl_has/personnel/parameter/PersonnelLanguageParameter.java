package com.howoocast.hywtl_has.personnel.parameter;

import com.howoocast.hywtl_has.common.parameter.CustomParameter;
import com.howoocast.hywtl_has.personnel.domain.PersonnelLanguage;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
@Getter
@Setter
public class PersonnelLanguageParameter extends CustomParameter<PersonnelLanguage> {

    private String name;

    private String type;

    private String grade;

    private String organizationName;

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
