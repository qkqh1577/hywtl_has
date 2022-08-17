package com.howoocast.hywtl_has.common.exception;

public class DuplicatedValueException extends CustomExceptionAdaptor {

    public DuplicatedValueException(
        String entityName,
        String property,
        String value
    ) {
        super(
            String.format("%s.%s.unique_violation", entityName, property),
            String.format("이미 사용 중인 값입니다. %s", value)
        );
    }
}
