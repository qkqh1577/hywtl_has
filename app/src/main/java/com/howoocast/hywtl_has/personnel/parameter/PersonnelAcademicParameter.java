package com.howoocast.hywtl_has.personnel.parameter;

import com.howoocast.hywtl_has.common.parameter.CustomParameter;
import com.howoocast.hywtl_has.personnel.domain.PersonnelAcademic;
import java.time.LocalDate;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Setter
public class PersonnelAcademicParameter extends CustomParameter<PersonnelAcademic> {

    @NotBlank(message = "교육기관명은 필수 항목입니다.")
    private String academyName;

    @NotBlank(message = "전공은 필수 항목입니다.")
    private String major;

    private String degree;

    private String grade;

    @NotNull(message = "시작일은 필수 항목입니다.")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @NotNull(message = "종료일은 필수 항목입니다.")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    @NotBlank(message = "재적 상태는 필수 항목입니다.")
    private String state;

    public PersonnelAcademic build() {
        return PersonnelAcademic.of(
            academyName,
            major,
            degree,
            state,
            grade,
            startDate,
            endDate
        );
    }
}
