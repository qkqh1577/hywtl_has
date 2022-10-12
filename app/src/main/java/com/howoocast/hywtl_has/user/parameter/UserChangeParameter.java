package com.howoocast.hywtl_has.user.parameter;

import com.howoocast.hywtl_has.user.common.UserRole;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserChangeParameter {

    @NotBlank(message = "user.name.not_blank")
    private String name;

    @NotBlank(message = "user.email.not_blank")
    private String email;

    @NotNull(message = "user.role.not_null")
    private UserRole role;

    @NotNull(message = "user.department_id.not_null")
    private Long departmentId;

}