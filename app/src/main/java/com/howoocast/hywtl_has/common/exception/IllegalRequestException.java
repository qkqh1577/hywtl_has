package com.howoocast.hywtl_has.common.exception;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class IllegalRequestException extends CustomExceptionAdaptor {

    public IllegalRequestException(String code, String message) {
        super(code, message);
    }

}
