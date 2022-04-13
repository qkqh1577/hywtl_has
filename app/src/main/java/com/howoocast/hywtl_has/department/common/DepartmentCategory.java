package com.howoocast.hywtl_has.department.common;

import lombok.Getter;

/**
 * 부서 유형
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

    private final String value;

    DepartmentCategory(final String value) {
        this.value = value;
    }

    public final String value() {
        return value;
    }
}
