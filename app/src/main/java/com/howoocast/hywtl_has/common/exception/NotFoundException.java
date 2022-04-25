package com.howoocast.hywtl_has.common.exception;

public class NotFoundException extends CustomExceptionAdaptor {

    public NotFoundException() {
        super(
            "system.not-found",
            "요청 항목을 찾을 수 없습니다."
        );
    }
}
