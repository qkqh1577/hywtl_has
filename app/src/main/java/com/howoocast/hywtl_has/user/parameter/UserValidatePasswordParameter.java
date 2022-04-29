package com.howoocast.hywtl_has.user.parameter;

import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserValidatePasswordParameter {

    @NotBlank(message = "user.email.not-blank")
    private String email;

    @NotBlank(message = "user.password.not-blank")
    private String password;

    @NotBlank(message = "user.auth-key.not-blank")
    private String authKey;
}
