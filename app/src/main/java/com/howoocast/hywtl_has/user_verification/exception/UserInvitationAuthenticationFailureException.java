package com.howoocast.hywtl_has.user_verification.exception;

import com.howoocast.hywtl_has.common.exception.CustomExceptionAdaptor;
import lombok.RequiredArgsConstructor;

public class UserInvitationAuthenticationFailureException extends CustomExceptionAdaptor {

    @RequiredArgsConstructor
    public enum UserInvitationAuthenticationFailureExceptionType {

        EXPIRED("user-invitation.expired", "유저 초대 코드가 만료되었습니다."),
        ILLEGAL_KEY("user-invitation.illegal-key", "정상적이지 않은 유저 초대 코드입니다.");

        private final String code;
        private final String message;
    }

    public UserInvitationAuthenticationFailureException(UserInvitationAuthenticationFailureExceptionType type) {
        super(type.code, type.message);
    }
}
