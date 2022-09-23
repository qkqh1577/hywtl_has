package com.howoocast.hywtl_has.personnel.parameter;

import com.howoocast.hywtl_has.common.parameter.CustomParameter;
import com.howoocast.hywtl_has.personnel.domain.PersonnelCareer;
import java.time.LocalDate;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Setter
public class PersonnelCareerParameter extends CustomParameter<PersonnelCareer> {

    @NotBlank(message = PersonnelCareer.KEY + ".company_name.not_blank")
    private String companyName;

    @NotNull(message = PersonnelCareer.KEY + ".start_date.not_null")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @NotNull(message = PersonnelCareer.KEY + ".end_date.not_null")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    @NotBlank(message = PersonnelCareer.KEY + ".major_job.not_blank")
    private String majorJob;

    public PersonnelCareer build() {
        return PersonnelCareer.of(
            companyName,
            startDate,
            endDate,
            majorJob
        );
    }
}
