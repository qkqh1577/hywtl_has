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

    @NotBlank(message = "근무처명은 필수 항목입니다.")
    private String companyName;

    @NotNull(message = "근무시작일은 필수 항목입니다.")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @NotNull(message = "근무종료일 필수 항목입니다.")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    @NotBlank(message = "주 업무는 필수 항목입니다.")
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
