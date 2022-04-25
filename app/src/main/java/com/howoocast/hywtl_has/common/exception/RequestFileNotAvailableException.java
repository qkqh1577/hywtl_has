package com.howoocast.hywtl_has.common.exception;

import lombok.RequiredArgsConstructor;

public class RequestFileNotAvailableException extends CustomExceptionAdaptor {

    @RequiredArgsConstructor
    public enum RequestFileNotAvailableExceptionType {
        IS_EMPTY("request-file.is-empty", "요청 파일을 사용할 수 없습니다."),
        NOT_ALLOWED_EXT("request-file.not-allowed-extension", "사용할 수 없는 확장자입니다."),
        EXCEEDED_SIZE("request-file.exceeded-size", "파일 용량을 초과했습니다.");

        private final String code;

        private final String message;
    }

    public RequestFileNotAvailableException(final RequestFileNotAvailableExceptionType type) {
        super(type.code, type.message);
    }
}
