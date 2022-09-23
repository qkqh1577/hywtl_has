package com.howoocast.hywtl_has.personnel.parameter;

import com.howoocast.hywtl_has.file.parameter.FileItemParameter;
import com.howoocast.hywtl_has.personnel.domain.PersonnelBasic;
import java.time.LocalDate;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
public class PersonnelBasicParameter {

    @NotBlank(message = PersonnelBasic.KEY + ".eng_name.not_blank")
    private String engName;

    @NotNull(message = PersonnelBasic.KEY + ".birth_date.not_null")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;

    @NotBlank(message = PersonnelBasic.KEY + ".sex.not_blank")
    private String sex;

    private FileItemParameter image;

    private String address;

    private String phone;

    private String emergencyPhone;

    private String relationship;

    private String personalEmail;

}
