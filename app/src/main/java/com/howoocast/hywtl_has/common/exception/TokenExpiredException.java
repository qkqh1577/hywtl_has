package com.howoocast.hywtl_has.common.exception;

public class TokenExpiredException extends CustomExceptionAdaptor {

    public TokenExpiredException(String entityName, String value) {
        super(
            String.format("%s.expired", entityName),
            String.format("만료된 토큰입니다. %s", value)
        );
    }

}
