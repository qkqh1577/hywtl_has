package com.howoocast.hywtl_has.project_contract.domain;

/**
 * 계약서 종류
 */
public enum ContractType {
    /**
     * 본 계약
     */
    ORIGIN("본 계약"),
    /**
     * 변경 계약
     */
    CHANGE("변경 계약"),
    /**
     * 추가 계약
     */
    ADDITION("추가 계약"),
    /**
     * 승계 계약
     */
    KEEP("승계 계약");
    private final String name;
    ContractType(final String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
