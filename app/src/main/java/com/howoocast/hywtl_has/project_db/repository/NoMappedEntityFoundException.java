package com.howoocast.hywtl_has.project_db.repository;

public class NoMappedEntityFoundException extends RuntimeException {
    public NoMappedEntityFoundException() {
        super();
    }

    public NoMappedEntityFoundException(String message) {
        super(message);
    }
}
