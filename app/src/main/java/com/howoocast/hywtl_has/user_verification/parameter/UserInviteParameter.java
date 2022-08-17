package com.howoocast.hywtl_has.user_verification.parameter;

import com.howoocast.hywtl_has.user.common.UserRole;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInviteParameter {

    @NotBlank(message = "user_verification.email.not_blank")
    private String email;

    @NotBlank(message = "user_verification.name.not_blank")
    private String name;

    @NotNull(message = "user_verification.department_id.not_null")
    private Long departmentId;

    @NotNull(message = "user_verification.role.not_null")
    private UserRole role;
}
