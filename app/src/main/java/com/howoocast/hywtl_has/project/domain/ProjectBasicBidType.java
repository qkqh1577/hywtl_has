package com.howoocast.hywtl_has.project.domain;

/**
 * 견적 구분
 */
public enum ProjectBasicBidType {
    /**
     * 일반
     */
    DEFAULT("일반"),
    /**
     * 나라장터 입찰
     */
    G2B("나라장터 입찰"),
    /**
     * 기업 입찰
     */
    COMPANY("기업 입찰");

    private final String name;

    ProjectBasicBidType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
