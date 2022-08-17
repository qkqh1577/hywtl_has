package com.howoocast.hywtl_has.user.parameter;

import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserAddParameter {

    @NotBlank(message = "user.username.not_blank")
    private String username;

    @NotBlank(message = "user.password.not_blank")
    private String password;

    @NotBlank(message = "user.name.not_blank")
    private String name;

    @NotBlank(message = "user.email.not_blank")
    private String email;

    @NotBlank(message = "user.auth_key.not_blank")
    private String authKey;
}