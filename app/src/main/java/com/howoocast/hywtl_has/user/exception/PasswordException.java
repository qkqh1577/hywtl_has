package com.howoocast.hywtl_has.user.exception;

import com.howoocast.hywtl_has.common.exception.CustomExceptionAdaptor;
import lombok.RequiredArgsConstructor;

public class PasswordException extends CustomExceptionAdaptor {

    @RequiredArgsConstructor
    public enum PasswordExceptionType {
        NOT_MATCH("password.not_match","비밀번호가 일치하지 않습니다."),
        EXPIRED("password.expired","비밀번호 변경이 필요합니다."),
        SAME("password.same","기존 비밀번호와 동일한 비밀번호는 사용할 수 없습니다."),
        WEAK("password.role_violation","비밀번호는 영문, 숫자, 특수문자 조합 8자리 이상으로 입력해 주세요"),
        NOT_EQUAL_NEW_PASSWORD("password.not_equal_new_password","신규 비밀번호 확인이 일치하지 않습니다.");
        private final String code;
        private final String message;

    }

    public PasswordException(PasswordExceptionType type) {
        super(type.code, type.message);
    }
}
