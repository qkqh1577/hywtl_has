package com.howoocast.hywtl_has.user.parameter;

import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserPasswordChangeParameter {

    @NotBlank(message = "user.now-password.not-blank")
    private String nowPassword;

    @NotBlank(message = "user.new-password.not-blank")
    private String newPassword;
}
