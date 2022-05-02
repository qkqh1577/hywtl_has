package com.howoocast.hywtl_has.project.common;

public enum ProjectTargetReviewStatus {

    COMPLETE("완료"),
    RECONSIDER("재검토"),
    DRAFT("초안");
    private final String message;

    ProjectTargetReviewStatus(String message) {
        this.message = message;
    }

    public String message() {
        return message;
    }
}
