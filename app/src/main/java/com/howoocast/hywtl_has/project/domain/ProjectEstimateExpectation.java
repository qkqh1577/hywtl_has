package com.howoocast.hywtl_has.project.domain;

/**
 * 견적 분류
 */
public enum ProjectEstimateExpectation {

    /**
     * 구조물
     */
    STRUCTURE("구조물"),

    /**
     * 일반
     */
    NORMAL("일반"),

    /**
     * 가능성 높음
     */
    HIGH("가능성 높음"),
    /**
     * 수주 직전
     */
    NEARLY("수주 직전"),
    /**
     * 수주 성공
     */
    WIN("수주 성공"),
    /**
     * 수주 실패
     */
    LOSE("수주 실패");

    private final String name;

    ProjectEstimateExpectation(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
