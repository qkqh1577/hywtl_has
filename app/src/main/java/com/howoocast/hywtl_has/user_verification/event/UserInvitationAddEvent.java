package com.howoocast.hywtl_has.user_verification.event;

import com.howoocast.hywtl_has.user_verification.domain.UserInvitation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UserInvitationAddEvent {

    private final UserInvitation data;
}
