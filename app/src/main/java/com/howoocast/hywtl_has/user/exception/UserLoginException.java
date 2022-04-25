package com.howoocast.hywtl_has.user.exception;

import com.howoocast.hywtl_has.common.exception.CustomExceptionAdaptor;
import lombok.RequiredArgsConstructor;

public class UserLoginException extends CustomExceptionAdaptor {

    @RequiredArgsConstructor
    public enum UserLoginExceptionType {

        LOCKED("user.locked", "유저가 잠김 처리 되어 있습니다."),
        RESIGNED("user.resigned", "유저가 퇴사 처리 되어 있습니다."),
        NOT_AUTHENTICATED("user.not-authenticated", "로그인이 필요합니다.");

        private final String code;
        private final String message;
    }

    public UserLoginException(UserLoginExceptionType type) {
        super(type.code, type.message);
    }
}
