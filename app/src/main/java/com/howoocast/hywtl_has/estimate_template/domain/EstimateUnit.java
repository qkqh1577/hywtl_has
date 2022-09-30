package com.howoocast.hywtl_has.estimate_template.domain;

/**
 * 단위
 */
public enum EstimateUnit {
    BUILDING("동"),
    SITE("단지");

    private final String name;

    EstimateUnit(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

}
