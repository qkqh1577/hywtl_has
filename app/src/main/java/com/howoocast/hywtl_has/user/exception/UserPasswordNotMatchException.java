package com.howoocast.hywtl_has.user.exception;

import com.howoocast.hywtl_has.common.exception.CustomExceptionAdaptor;

public class UserPasswordNotMatchException extends CustomExceptionAdaptor {

    public UserPasswordNotMatchException() {
        super("비밀번호를 확인해 주세요.");
    }
}
