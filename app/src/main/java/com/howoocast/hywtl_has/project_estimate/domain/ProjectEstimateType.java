package com.howoocast.hywtl_has.project_estimate.domain;

/**
 * 견적 구분
 */
public enum ProjectEstimateType {
    /**
     * 시스템 견적서
     */
    SYSTEM,
    /**
     * 커스텀 견적서
     */
    CUSTOM,
    /**
     * 대비 견적서
     */
    COMPARISON,
    /**
     * 협력 견적서
     */
    SUB_CONTRACTOR, // TODO: 협력 견적서가 협력사에 제시하는 견적서인지 확인 필요
}
