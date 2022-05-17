package com.howoocast.hywtl_has.user_verification.controller;

import com.howoocast.hywtl_has.user_verification.parameter.PasswordResetParameter;
import com.howoocast.hywtl_has.user_verification.service.PasswordResetService;
import com.howoocast.hywtl_has.user_verification.view.PasswordResetView;
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

    @GetMapping("/user-verification/password-reset/authenticate")
    public PasswordResetView authenticate(
        @RequestParam String email,
        @RequestParam String authKey
    ) {
        return passwordResetService.authenticate(email, authKey);
    }

    @PostMapping("/user-verification/password-reset")
    public void reset(@Valid @RequestBody PasswordResetParameter params) {
        passwordResetService.reset(params);
    }
}
