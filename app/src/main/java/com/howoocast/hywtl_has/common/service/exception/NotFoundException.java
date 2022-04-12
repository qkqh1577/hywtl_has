package com.howoocast.hywtl_has.common.service.exception;

import org.springframework.http.HttpStatus;

public class NotFoundException extends CustomExceptionAdaptor {

    public NotFoundException() {
        super("해당 페이지를 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
    }
}
