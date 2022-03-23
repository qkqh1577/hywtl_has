package com.howoocast.hywtl_has.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class NotFoundException extends RuntimeException {

    public ResponseEntity<String> getResponse() {
        return new ResponseEntity<>("NotFound", HttpStatus.NOT_FOUND);
    }
}
