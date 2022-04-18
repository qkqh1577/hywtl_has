package com.howoocast.hywtl_has.common.exception;

public class FileSystemException extends CustomExceptionAdaptor {

    public enum FileSystemExceptionType {
        PERMISSION_DENIED("접근 권한이 없습니다."),
        NOT_DIRECTORY("폴더가 아닙니다."),
        NOT_FOUND("해당 파일을 찾을 수 없습니다."),
        IS_BUSY("다른 사용자가 사용하고 있습니다."),
        DISK_FULLY_USED("디크스 공간이 없습니다."),
        IO_EXCEPTION("파일 처리 중 오류가 발생하였습니다."),
        ALREADY_EXISTS("이미 해당 파일이 존재합니다.");

        private final String message;

        FileSystemExceptionType(final String message) {
            this.message = message;
        }
    }

    public FileSystemException(final FileSystemExceptionType type) {
        super(type.message);
    }
}
