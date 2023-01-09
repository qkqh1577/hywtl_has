package com.howoocast.hywtl_has.migration.enums;

public enum ProjectStatusHeader {
    /**
     * 프로젝트 코드
     */
    CODE("NO"),
    /**
     * 프로젝트명
     */
    NAME("프로젝트명"),
    /**
     * 견적상태
     */
    ESTIMATE_STATUS("견적상태"),
    /**
     * 견적분류
     */
    ESTIMATE_EXPECTATION("견적분류"),
    /**
     * 계약상태
     */
    CONTRACT_STATUS("계약상태"),
    /**
     * 진행현황
     */
    PROGRESS_STATUS("진행현황"),
    /**
     * 견적구분
     */
    BASIC_BID_TYPE("견적구분");

    private final String name;

    ProjectStatusHeader(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }
}
