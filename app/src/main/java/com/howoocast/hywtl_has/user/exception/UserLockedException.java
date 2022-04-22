package com.howoocast.hywtl_has.user.exception;

import com.howoocast.hywtl_has.common.exception.CustomExceptionAdaptor;

public class UserLockedException extends CustomExceptionAdaptor {

    public UserLockedException() {
        super("유저가 잠김 처리 되어 있습니다.");
    }
}
