package com.howoocast.hywtl_has.login.parameter;

import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserPasswordResetParameter {
    @NotBlank(message = "password_reset_token.not_blank")
    private String token;

    @NotBlank(message = "user.new_password.not_blank")
    private String newPassword;

    @NotBlank(message = "user.new_password_confirm.not_blank")
    private String newPasswordConfirm;
}
