package com.howoocast.hywtl_has.user.invitation.event;

import com.howoocast.hywtl_has.user.invitation.domain.UserInvitation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UserInvitationAddEvent {

    private final UserInvitation data;
}
