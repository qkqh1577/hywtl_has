package com.howoocast.hywtl_has.user.invitation.service.exception;

import com.howoocast.hywtl_has.common.service.exception.CustomExceptionAdaptor;

public class UserInvitationAuthenticationFailureException extends CustomExceptionAdaptor {

    public UserInvitationAuthenticationFailureException() {
        super("잘못된 접근입니다.");
    }
}
