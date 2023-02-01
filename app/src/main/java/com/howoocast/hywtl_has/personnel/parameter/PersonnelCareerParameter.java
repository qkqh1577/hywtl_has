package com.howoocast.hywtl_has.personnel.parameter;

import com.howoocast.hywtl_has.common.parameter.CustomParameter;
import com.howoocast.hywtl_has.personnel.domain.PersonnelCareer;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
@Getter
@Setter
public class PersonnelCareerParameter extends CustomParameter<PersonnelCareer> {

    private String companyName;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

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
