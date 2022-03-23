package com.howoocast.hywtl_has.user.parameter;

import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserChangeParameter {

    @NotBlank
    private String name;

    @NotBlank
    private String email;

}