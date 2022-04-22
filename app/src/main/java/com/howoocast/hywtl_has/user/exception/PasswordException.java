package com.howoocast.hywtl_has.user.exception;

import com.howoocast.hywtl_has.common.exception.CustomExceptionAdaptor;

public class PasswordException extends CustomExceptionAdaptor {

    public enum PasswordExceptionType {
        NOT_MATCH("비밀번호가 일치하지 않습니다."),
        INVALIDATED("비밀번호 변경이 필요합니다."),
        SAME("기존 비밀번호와 동일한 비밀번호는 사용할 수 없습니다."),
        WEAK("비밀번호 규칙에 맞지 않습니다.")
        ;
        private final String message;

        PasswordExceptionType(String message) {
            this.message = message;
        }
    }

    public PasswordException(PasswordExceptionType type) {
        super(type.message);
    }
}
