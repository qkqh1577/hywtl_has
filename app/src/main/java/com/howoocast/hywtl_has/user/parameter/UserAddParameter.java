package com.howoocast.hywtl_has.user.parameter;

import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserAddParameter {

    @NotBlank(message = "user.username.not-blank")
    private String username;

    @NotBlank(message = "user.password.not-blank")
    private String password;

    @NotBlank(message = "user.name.not-blank")
    private String name;

    @NotBlank(message = "user.email.not-blank")
    private String email;

    @NotBlank(message = "user.auth-key.not-blank")
    private String authKey;
}