package com.howoocast.hywtl_has.common.controller;

import com.howoocast.hywtl_has.common.exception.CustomExceptionAdaptor;
import com.howoocast.hywtl_has.common.exception.DuplicatedValueException;
import com.howoocast.hywtl_has.common.exception.IllegalRequestException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ExceptionController {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<?> notFound(NotFoundException e) {
        return e.getResponse();
    }

    @ExceptionHandler(DuplicatedValueException.class)
    public ResponseEntity<?> duplicatedValue(DuplicatedValueException e) {
        return e.getResponse();
    }

    @ExceptionHandler(IllegalRequestException.class)
    public ResponseEntity<?> illegalRequest(IllegalRequestException e) {
        return e.getResponse();
    }

    @ExceptionHandler(CustomExceptionAdaptor.class)
    public ResponseEntity<?> exception(CustomExceptionAdaptor e) {
        return e.getResponse();
    }
}
