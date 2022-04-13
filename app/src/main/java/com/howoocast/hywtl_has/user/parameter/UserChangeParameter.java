package com.howoocast.hywtl_has.user.parameter;

import com.howoocast.hywtl_has.user.common.UserRole;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserChangeParameter {

    @NotBlank(message = "이름은 필수 항목입니다.")
    private String name;

    @NotBlank(message = "이메일은 필수 항목입니다.")
    private String email;

    @NotNull(message = "권한은 필수 항목입니다.")
    private UserRole userRole;

    @NotNull(message = "소속 부서는 필수 항목입니다.")
    private Long departmentId;

}