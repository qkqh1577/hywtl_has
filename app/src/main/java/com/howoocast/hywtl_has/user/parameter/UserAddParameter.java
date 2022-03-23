package com.howoocast.hywtl_has.user.parameter;

import com.howoocast.hywtl_has.user.domain.UserRole;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAddParameter {

    @NotBlank
    private String username;

    @NotBlank
    private String password;

    @NotBlank
    private String name;

    @NotBlank
    private String email;

    @NotNull
    private Long departmentId;

    @NotNull
    private UserRole userRole;

}