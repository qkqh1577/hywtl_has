package com.howoocast.hywtl_has.common.exception;

import lombok.RequiredArgsConstructor;

public class FileSystemException extends CustomExceptionAdaptor {

    @RequiredArgsConstructor
    public enum FileSystemExceptionType {
        ILLEGAL_REQUEST("file.illegal-request", "요청이 잘못되었습니다."),
        PERMISSION_DENIED("file.permission-denied", "접근 권한이 없습니다."),
        NOT_DIRECTORY("file.not-directory", "폴더가 아닙니다."),
        NOT_FOUND("file.not-found", "해당 파일을 찾을 수 없습니다."),
        IS_BUSY("file.is-busy", "다른 사용자가 사용하고 있습니다."),
        DISK_FULLY_USED("file.disk-fully-used", "디크스 공간이 없습니다."),
        IO_EXCEPTION("file.io-exception", "파일 처리 중 오류가 발생하였습니다."),
        ALREADY_EXISTS("file.already-exists", "이미 해당 파일이 존재합니다.");

        private final String code;
        private final String message;

    }

    public FileSystemException(final FileSystemExceptionType type) {
        super(type.code, type.message);
    }
}
