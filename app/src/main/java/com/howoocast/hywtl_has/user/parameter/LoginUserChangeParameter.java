package com.howoocast.hywtl_has.user.parameter;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class LoginUserChangeParameter {

    private MultipartFile profile;
    private String englishName;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;
    private String sex;
    private String mobilePhone;
    private String privateEmail;
    private String emergencyPhone;
    private String relationship;
    private String address;

}
