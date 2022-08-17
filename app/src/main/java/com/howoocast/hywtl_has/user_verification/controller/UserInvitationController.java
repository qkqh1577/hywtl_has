package com.howoocast.hywtl_has.user_verification.controller;

import com.howoocast.hywtl_has.user_verification.service.UserInvitationService;
import com.howoocast.hywtl_has.user_verification.parameter.UserInviteParameter;
import com.howoocast.hywtl_has.user_verification.view.UserInvitationView;
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
public class UserInvitationController {

    private final UserInvitationService userInvitationService;

    @GetMapping("/user-verification/user-invitation/authenticate")
    public UserInvitationView authenticate(
        @RequestParam String email,
        @RequestParam String authKey
    ) {
        return userInvitationService.authenticate(email, authKey);
    }

    @PostMapping("/user-verification/user-invitation")
    public UserInvitationView invite(@Valid @RequestBody UserInviteParameter parameter) {
        return userInvitationService.invite(parameter);
    }

}
