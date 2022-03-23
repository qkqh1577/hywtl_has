package com.howoocast.hywtl_has.common.exception;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RequiredArgsConstructor
public class DuplicatedValueException extends RuntimeException {

    private final String property;
    private final String value;

    public ResponseEntity<String> getResponse() {
        String message = String.format("DuplicatedValue. property: %s, value: %s", property, value);
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }
}
