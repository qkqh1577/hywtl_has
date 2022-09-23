package com.howoocast.hywtl_has.project_estimate.domain;

/**
 * 견적 구분
 */
public enum ProjectEstimateType {
    /**
     * 시스템 견적서
     */
    SYSTEM("시스템 견적서"),
    /**
     * 커스텀 견적서
     */
    CUSTOM("커스텀 견적서"),
    /**
     * 대비 견적서
     */
    COMPARISON("대비 견적서"),
    /**
     * 협력 견적서
     */
    SUB_CONTRACTOR("협력 견적서");


    private final String name;

    ProjectEstimateType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }


}
