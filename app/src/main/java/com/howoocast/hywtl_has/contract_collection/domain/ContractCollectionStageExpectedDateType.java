package com.howoocast.hywtl_has.contract_collection.domain;

/**
 * 단계 금액 예상 지급일
 */
public enum ContractCollectionStageExpectedDateType {
    /**
     * 계약일
     */
    CONTRACT_DAY,
    /**
     * 설풍구조납품일
     */
    DAY_TO_DELIVER_THOUGH_SNOW_AND_WIND,
    /**
     * 최종보고서납품일
     */
    DAY_TO_DELIVER_FOE_FINAL_REPORT,
    /**
     * 직접입력
     */
    DIRECT
}
