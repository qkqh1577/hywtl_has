package com.howoocast.hywtl_has.personnel.parameter;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
public class PersonnelCompanyParameter {

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate hiredDate;

    private String hiredType;

    private String recommender;

}
