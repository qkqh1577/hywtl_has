package com.howoocast.hywtl_has.personnel.parameter;

import com.howoocast.hywtl_has.common.parameter.FileItemParameter;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonnelBasicParameter {

    private String engName;
    private LocalDate birthDate;
    private String sex;
    private FileItemParameter image;
    private String address;
    private String phone;
    private String emergencyPhone;
    private String relationship;
    private String personalEmail;

}
