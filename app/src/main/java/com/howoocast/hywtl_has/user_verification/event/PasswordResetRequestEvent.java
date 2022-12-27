package com.howoocast.hywtl_has.user_verification.event;

import com.howoocast.hywtl_has.user_verification.domain.PasswordReset;
import com.howoocast.hywtl_has.user_verification.domain.PasswordResetToken;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class PasswordResetRequestEvent {

    private final PasswordReset data;

    private final PasswordResetToken token;
}
