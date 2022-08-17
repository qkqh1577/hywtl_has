package com.howoocast.hywtl_has.user_verification.exception;

import com.howoocast.hywtl_has.common.exception.CustomExceptionAdaptor;
import lombok.RequiredArgsConstructor;

public class UserVerificationAuthenticationFailureException extends CustomExceptionAdaptor {

    @RequiredArgsConstructor
    public enum UserInvitationAuthenticationFailureExceptionType {

        EXPIRED("user_invitation.expired", "코드가 만료되었습니다."),
        ILLEGAL_KEY("user_invitation.illegal_key", "정상적이지 않은 코드입니다.");

        private final String code;
        private final String message;
    }

    public UserVerificationAuthenticationFailureException(UserInvitationAuthenticationFailureExceptionType type) {
        super(type.code, type.message);
    }
}
