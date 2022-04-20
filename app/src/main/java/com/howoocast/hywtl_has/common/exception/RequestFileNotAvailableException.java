package com.howoocast.hywtl_has.common.exception;

public class RequestFileNotAvailableException extends CustomExceptionAdaptor {

    public enum RequestFileNotAvailableExceptionType {
        IS_EMPTY("요청 파일을 사용할 수 없습니다."),
        NOT_ALLOWED_EXT("사용할 수 없는 확장자입니다."),
        EXCEEDED_SIZE("파일 용량을 초과했습니다.");


        RequestFileNotAvailableExceptionType(final String message) {
            this.message = message;
        }

        private final String message;
    }

    public RequestFileNotAvailableException(final RequestFileNotAvailableExceptionType type) {
        super(type.message);
    }
}
