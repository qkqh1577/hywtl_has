package com.howoocast.hywtl_has.personnel.parameter;

import com.howoocast.hywtl_has.common.parameter.CustomParameter;
import com.howoocast.hywtl_has.personnel.domain.PersonnelLanguage;
import java.time.LocalDate;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Setter;

@Setter
public class PersonnelLanguageParameter extends CustomParameter<PersonnelLanguage> {

    @NotBlank(message = "자격증명은 필수 항목입니다.")
    private String name;

    @NotBlank(message = "자격증 대상 언어는 필수 항목입니다.")
    private String type;

    private String grade;

    @NotBlank(message = "발급기관명은 필수 항목입니다.")
    private String organizationName;

    @NotNull(message = "취득일은 필수 항목입니다.")
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
