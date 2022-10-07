package com.howoocast.hywtl_has.login.parameter;

import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserPasswordChangeParameter {

    @NotBlank(message = "user.now_password.not_blank")
    private String nowPassword;

    @NotBlank(message = "user.new_password.not_blank")
    private String newPassword;
}
