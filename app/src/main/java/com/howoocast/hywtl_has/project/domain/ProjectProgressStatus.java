package com.howoocast.hywtl_has.project.domain;

/**
 * 진행 현황
 */
public enum ProjectProgressStatus {
    /**
     * 가등록
     */
    TEMPORARY,
    /**
     * 등록
     */
    UNDER_CONTRACT,
    /**
     * 용역 개시 전
     */
    BEFORE_SERVICE,
    /**
     * 용역 진행 중
     */
    SERVICE_ON_GOING,
    /**
     * 용역 완료
     */
    SERVICE_COMPLETE,
    /**
     * 용역 홀딩
     */
    SERVICE_HOLDING,
}
