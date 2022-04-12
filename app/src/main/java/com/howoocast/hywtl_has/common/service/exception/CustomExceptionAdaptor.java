package com.howoocast.hywtl_has.common.service.exception;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RequiredArgsConstructor
public abstract class CustomExceptionAdaptor extends RuntimeException {

    private final String message;
    private final HttpStatus status;

    public CustomExceptionAdaptor() {
        this("알 수 없는 에러가 발생하였습니다.");
    }

    public CustomExceptionAdaptor(String message) {
        this(message, HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<String> getResponse() {
        return new ResponseEntity<>(message, status);
    }
}
