package com.howoocast.hywtl_has.common.exception;

public class FieldException extends CustomExceptionAdaptor {

    public FieldException(String field) {
        super(String.format("%s 필드가 정의되지 않았습니다.", field));
    }
}
