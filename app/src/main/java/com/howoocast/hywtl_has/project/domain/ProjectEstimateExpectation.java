package com.howoocast.hywtl_has.project.domain;

/**
 * 견적 분류
 */
public enum ProjectEstimateExpectation {
    /**
     * 가능성 낮음
     */
    LOW("가능성 낮음"),
    /**
     * 가능성 보통
     */
    AVERAGE("가능성 보통"),
    /**
     * 가능성 높음
     */
    HIGH("가능성 높음"),
    /**
     * 계약 직전
     */
    NEARLY("계약 직전"),
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
