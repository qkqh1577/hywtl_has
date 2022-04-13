package com.howoocast.hywtl_has.user_verification.exception;

import com.howoocast.hywtl_has.common.exception.CustomExceptionAdaptor;

public class UserInvitationAuthenticationFailureException extends CustomExceptionAdaptor {

    public UserInvitationAuthenticationFailureException() {
        super("잘못된 접근입니다.");
    }
}
