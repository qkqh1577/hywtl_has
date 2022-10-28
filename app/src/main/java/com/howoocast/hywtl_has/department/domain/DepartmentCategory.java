package com.howoocast.hywtl_has.department.domain;

/**
 * 조직 유형
 */
public enum DepartmentCategory {
    /**
     * 회사
     */
    COMPANY("회사"),

    /**
     * 본부
     */
    HQ("본부"),

    /**
     * 팀
     */
    TEAM("팀"),

    /**
     * 부
     */
    PART("부"),

    /**
     * 개인
     */
    PERSON("개인"),

    /**
     * 기타
     */
    EXTRA("기타");

    private final String name;

    DepartmentCategory(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

}
