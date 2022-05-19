package com.howoocast.hywtl_has.project_review.exception;

import com.howoocast.hywtl_has.common.exception.CustomExceptionAdaptor;
import lombok.RequiredArgsConstructor;

public class ProjectReviewException extends CustomExceptionAdaptor {

    @RequiredArgsConstructor
    public enum ProjectReviewExceptionType {
        CONFIRMED_EXISTS("project-review.confirmed-exists", "이미 확정된 검토가 있습니다."),
        ALREADY_CONFIRMED("project-review.already-confirmed", "이미 확정된 검토입니다."),
        ALREADY_UNCONFIRMED("project-review.already-unconfirmed", "이미 확정 취소된 검토입니다.");
        private final String code;
        private final String message;
    }

    public ProjectReviewException(ProjectReviewExceptionType type) {
        super(type.code, type.message);
    }
}
