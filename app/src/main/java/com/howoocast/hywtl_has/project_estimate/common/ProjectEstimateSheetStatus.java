package com.howoocast.hywtl_has.project_estimate.common;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum ProjectEstimateSheetStatus {

    DRAFT("초안"),
    DRAFT_CONFIRMED("초안확정"),
    SENT("전달"),
    RECONSIDER("재검토"),
    RECONSIDER_CONFIRMED("재검토확정"),
    RECONSIDER_SENT("재검토전달"),
    COMPLETE("완료");
    private final String message;

    public String message() {
        return message;
    }
}
