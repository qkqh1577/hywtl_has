package com.howoocast.hywtl_has.personnel.parameter;

import java.time.LocalDate;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
public class PersonnelCompanyParameter {

    @NotNull(message = "입사일은 필수 항목입니다.")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate hiredDate;

    @NotBlank(message = "입사 구분은 필수 항목입니다.")
    @Pattern(message = "입사 구분은 이하 중 하나만 가능합니다. (신입, 경력)", regexp = "신입|경력")
    private String hiredType;

    private String recommender;

}
