package com.howoocast.hywtl_has.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RequiredArgsConstructor
public abstract class CustomExceptionAdaptor extends RuntimeException {


    private final ErrorBody errorBody;

    private final HttpStatus status;

    public CustomExceptionAdaptor() {
        this("system.unknown", "알 수 없는 에러가 발생하였습니다.");
    }

    public CustomExceptionAdaptor(String code, String message) {
        this(new ErrorBody(code, message), HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<ErrorBody> getResponse() {
        return new ResponseEntity<>(errorBody, status);
    }

    @Getter
    @RequiredArgsConstructor
    public static class ErrorBody {

        private final String code;
        private final String message;
    }
}
