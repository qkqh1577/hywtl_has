package com.howoocast.hywtl_has.estimate_template.domain;
/**
 * 실험 타입
 */
public enum TestType {

    /**
     * 공통
     */
    COMMON,

    /**
     * 풍력 실험, Wind Force Test
     */
    F,
    /**
     * 풍압 실험, Wind Pressure Test
     */
    P,
    /**
     * 공기력 진동 실험 Aeroelastic Test
     */
    A,
    /**
     * 풍환경 실험, Wind Environment Test
     */
    E,
    /**
     * 빌딩풍 시뮬레이션, Building Wind Simulation Test
     */
    B,
    /**
     * 구검(건축구조설계사 검토), Architectural Structures Engineer Review
     */
    REVIEW,
}
