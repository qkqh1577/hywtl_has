package com.howoocast.hywtl_has.project.domain;

/**
 * 견적 상태
 */
public enum ProjectEstimateStatus {
    /**
     * 구두 견적
     */
    ORAL("구두 견적"),
    /**
     * 견적 전
     */
    BEFORE("견적 전"),
    /**
     * 견적 완료
     */
    COMPLETE("견적 완료"),
    /**
     * 대비 견적
     */
    CONTRAST("대비 견적");

    private final String name;

    ProjectEstimateStatus(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
