package com.howoocast.hywtl_has.user.parameter;

import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserValidatePasswordParameter {

    @NotBlank(message = "user.email.not_blank")
    private String email;

    @NotBlank(message = "user.password.not_blank")
    private String password;

    @NotBlank(message = "user.auth_key.not_blank")
    private String authKey;
}
