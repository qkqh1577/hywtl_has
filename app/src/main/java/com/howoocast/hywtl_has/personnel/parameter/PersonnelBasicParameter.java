package com.howoocast.hywtl_has.personnel.parameter;

import com.howoocast.hywtl_has.file.parameter.FileItemParameter;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
public class PersonnelBasicParameter {

    private String engName;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;

    private String sex;

    private FileItemParameter image;

    private String address;

    private String phone;

    private String emergencyPhone;

    private String relationship;

    private String personalEmail;

}
