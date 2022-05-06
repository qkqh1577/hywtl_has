package com.howoocast.hywtl_has.project_target_review.exception;

import com.howoocast.hywtl_has.common.exception.CustomExceptionAdaptor;
import lombok.RequiredArgsConstructor;

public class ProjectTargetReviewException extends CustomExceptionAdaptor {

    @RequiredArgsConstructor
    public enum ProjectTargetReviewExceptionType {
        CONFIRMED_EXISTS("project.target.review.confirmed-exists", "이미 확정된 검토가 있습니다."),
        ALREADY_CONFIRMED("project.target.review.already-confirmed", "이미 확정된 검토입니다."),
        ALREADY_UNCONFIRMED("project.target.review.already-unconfirmed", "이미 확정 취소된 검토입니다.");
        private final String code;
        private final String message;
    }

    public ProjectTargetReviewException(ProjectTargetReviewExceptionType type) {
        super(type.code, type.message);
    }
}
