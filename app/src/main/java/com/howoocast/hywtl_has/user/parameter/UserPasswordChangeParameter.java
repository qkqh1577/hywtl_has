package com.howoocast.hywtl_has.user.parameter;

import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserPasswordChangeParameter {

    @NotBlank(message = "현재 비밀번호는 필수 항목입니다.")
    private String nowPassword;

    @NotBlank(message = "신규 비밀번호는 필수 항목입니다.")
    private String newPassword;
}
