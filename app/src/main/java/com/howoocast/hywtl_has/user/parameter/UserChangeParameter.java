package com.howoocast.hywtl_has.user.parameter;

import com.howoocast.hywtl_has.department.parameter.DepartmentIdParameter;
import com.howoocast.hywtl_has.user.common.UserRole;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserChangeParameter {

    @NotBlank(message = "user.name.not-blank")
    private String name;

    @NotBlank(message = "user.email.not-blank")
    private String email;

    @NotNull(message = "user.role.not-null")
    private UserRole role;

    @NotNull(message = "user.department.not-null")
    private DepartmentIdParameter department;

}