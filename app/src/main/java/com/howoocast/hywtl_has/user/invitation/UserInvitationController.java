package com.howoocast.hywtl_has.user.invitation;

import com.howoocast.hywtl_has.user.invitation.service.UserInvitationService;
import com.howoocast.hywtl_has.user.invitation.service.parameter.UserInviteParameter;
import com.howoocast.hywtl_has.user.invitation.service.view.UserInvitationView;
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

    @GetMapping("/user-invitations/authenticate")
    public UserInvitationView authenticate(
        @RequestParam String email,
        @RequestParam String authKey
    ) {
        return userInvitationService.authenticate(email, authKey);
    }

    @PostMapping("/user-invitations")
    public UserInvitationView invite(@Valid @RequestBody UserInviteParameter params) {
        return userInvitationService.invite(params);
    }

}
