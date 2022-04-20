package com.howoocast.hywtl_has.personnel.parameter;

import java.time.LocalDate;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
public class PersonnelLicenseParameter {

    @NotBlank(message = "면허명은 필수입니다.")
    private String name;

    private String type;

    @NotBlank(message = "발급기관명은 필수입니다.")
    private String organizationName;

    @NotBlank(message = "승인 번호는 필수입니다.")
    private String qualifiedNumber;

    @NotBlank(message = "승인 일자는 필수입니다.")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate qualifiedDate;

    private String memo;
}
