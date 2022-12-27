package com.howoocast.hywtl_has.project.domain;

/**
 * 진행 현황
 */
public enum ProjectProgressStatus {
    /**
     * 가등록
     */
    TEMPORARY("가등록"),
    /**
     * 등록
     */
    UNDER_CONTRACT("등록"),
    /**
     * 업무 개시 전
     */
    BEFORE_SERVICE("업무 개시 전"),
    /**
     * 업무 진행 중
     */
    SERVICE_ON_GOING("업무 진행 중"),
    /**
     * 업무 완료
     */
    SERVICE_COMPLETE("업무 완료"),
    /**
     * 업무 홀딩
     */
    SERVICE_HOLDING("업무 홀딩");

    private final String name;

    ProjectProgressStatus(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
