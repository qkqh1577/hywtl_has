package com.howoocast.hywtl_has.common.exception;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RequiredArgsConstructor
public class IllegalRequestException extends CustomExceptionAdaptor {

    public IllegalRequestException(String message) {
        super(message);
    }

}
