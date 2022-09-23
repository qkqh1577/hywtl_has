package com.howoocast.hywtl_has.business.domain;

/**
 * 관계사 유형
 */
public enum ProjectInvolvedType {
    /**
     * 발주처
     */
    ORDERER("발주처"),
    /**
     * 시공사
     */
    BUILDER("시공사"),
    /**
     * 건축설계사무소
     */
    ARCHITECTURAL("건축설계사무소"),
    /**
     * 구조설계사무소
     */
    STRUCTURAL("구조설계사무소"),
    /**
     * 시행사
     */
    ENFORCER("시행사"),
    /**
     * 소개자
     */
    RECOMMENDER("소개자");

    private final String name;

    ProjectInvolvedType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
