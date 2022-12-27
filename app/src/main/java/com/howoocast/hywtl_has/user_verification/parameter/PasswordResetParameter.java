package com.howoocast.hywtl_has.user_verification.parameter;

import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordResetParameter {

    @NotBlank(message = "user_verification.username.not_blank")
    private String username;

}
