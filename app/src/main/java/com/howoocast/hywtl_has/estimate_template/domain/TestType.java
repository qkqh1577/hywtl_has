package com.howoocast.hywtl_has.estimate_template.domain;

/**
 * 실험 타입
 */
public enum TestType {

    /**
     * 공통
     */
    COMMON("공통"),

    /**
     * 풍력 실험, Wind Force Test
     */
    F("F"),
    /**
     * 풍압 실험, Wind Pressure Test
     */
    P("P"),
    /**
     * 공기력 진동 실험 Aeroelastic Test
     */
    A("A"),
    /**
     * 풍환경 실험, Wind Environment Test
     */
    E("E"),
    // NOTE: 기획에서 제외됨
    /**
     * 빌딩풍 시뮬레이션, Building Wind Simulation Test
     */
    B("B"),
    /**
     * 구검(건축구조설계사 검토), Architectural Structures Engineer Review
     */
    REVIEW("구검");

    private final String name;

    TestType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
