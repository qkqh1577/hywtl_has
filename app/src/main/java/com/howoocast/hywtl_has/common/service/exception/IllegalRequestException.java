package com.howoocast.hywtl_has.common.service.exception;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RequiredArgsConstructor
public class IllegalRequestException extends IllegalStateException {

    private final String message;

    public ResponseEntity<String> getResponse() {
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

}
