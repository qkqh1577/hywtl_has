package com.howoocast.hywtl_has.login.parameter;

import com.howoocast.hywtl_has.file.parameter.FileItemParameter;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
public class LoginUserChangeParameter {

    private FileItemParameter profile;
    private String engName;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;
    private String sex;
    private String mobilePhone;
    private String privateEmail;
    private String emergencyPhone;
    private String relationship;
    private String address;
}
