package com.howoocast.hywtl_has.user.exception;

import com.howoocast.hywtl_has.common.exception.CustomExceptionAdaptor;

public class UserPasswordSameException extends CustomExceptionAdaptor {

    public UserPasswordSameException() {
        super("기존 비밀번호와 동일한 비밀번호는 사용할 수 없습니다.");
    }
}
