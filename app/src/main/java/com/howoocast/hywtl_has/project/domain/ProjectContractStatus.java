package com.howoocast.hywtl_has.project.domain;

/**
 * 계약 상태
 */
public enum ProjectContractStatus {
    /**
     * 계약 전
     */
    BEFORE("계약 전"),
    /**
     * 계약 완료
     */
    COMPLETE("계약 완료"),
    /**
     * 변경 계약 중
     */
    CHANGE("변경 계약 중");

    private final String name;

    ProjectContractStatus(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
