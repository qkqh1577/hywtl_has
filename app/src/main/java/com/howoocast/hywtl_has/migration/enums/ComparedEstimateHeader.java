package com.howoocast.hywtl_has.migration.enums;

public enum ComparedEstimateHeader {
    /**
     * 프로젝트 코드
     */
    CODE("번호"),
    /**
     * 프로젝트명
     */
    NAME("프로젝트명"),

    /**
     *  요청사
     */
    RECIPIENT("요청사"),

    /**
     * 의뢰처
     */
    BUSINESS_NAME("의뢰처");

    private final String name;
    ComparedEstimateHeader(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }
}
