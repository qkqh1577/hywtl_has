package com.howoocast.hywtl_has.user_verification.parameter;

import com.howoocast.hywtl_has.user.common.UserRole;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInviteParameter {

    @NotBlank(message = "user-verification.email.not-blank")
    private String email;

    @NotBlank(message = "user-verification.name.not-blank")
    private String name;

    @NotNull(message = "user-verification.department-id.not-null")
    private Long departmentId;

    @NotNull(message = "user-verification.role.not-null")
    private UserRole role;
}
