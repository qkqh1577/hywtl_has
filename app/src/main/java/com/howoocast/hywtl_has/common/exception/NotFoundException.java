package com.howoocast.hywtl_has.common.exception;

public class NotFoundException extends CustomExceptionAdaptor {

    public NotFoundException(String code, Long id) {
        super(
            String.format("%s.not-found", code),
            String.format("요청 항목을 찾을 수 없습니다. id: %d", id)
        );
    }

    public NotFoundException(String code, String message) {
        super(
            String.format("%s.not-found", code),
            String.format("요청 항목을 찾을 수 없습니다. %s", message)
        );
    }
}
