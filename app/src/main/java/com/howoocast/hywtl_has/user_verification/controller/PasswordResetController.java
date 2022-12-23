package com.howoocast.hywtl_has.user_verification.controller;

import com.howoocast.hywtl_has.user_verification.parameter.PasswordResetParameter;
import com.howoocast.hywtl_has.user_verification.service.PasswordResetService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class PasswordResetController {

    private final PasswordResetService passwordResetService;

    @PostMapping("/user-verification/password-reset")
    public void resetByEmail(@Valid @RequestBody PasswordResetParameter parameter) {
        passwordResetService.reset(parameter);
    }

    @GetMapping("/user-verification/password-reset/validate")
    public Boolean validate(@RequestParam String token) {
        return passwordResetService.validate(token);
    }
}
