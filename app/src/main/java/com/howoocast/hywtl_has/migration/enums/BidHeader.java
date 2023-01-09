package com.howoocast.hywtl_has.migration.enums;

public enum BidHeader {
    /**
     * 년도
     */
    YEAR("년도"),
    /**
     * PJ번호
     */
    PROJECT_CODE("PJ번호"),
    /**
     * 프로젝트명(닉네임)
     */
    PROJECT_NAME("프로젝트명(닉네임)"),
    /**
     * 수요기관
     */
    DEMAND_ORGANIZATION("수요기관"),
    /**
     * 1차공고일
     */
    FIRST_ANNOUNCEMENT_DATE("1차공고일"),
    /**
     * 2차공고일
     */
    SECOND_ANNOUNCEMENT_DATE("2차공고일"),
    /**
     * 3차공고일
     */
    THIRD_ANNOUNCEMENT_DATE("3차공고일"),
    /**
     * 결과
     */
    RESULT("결과"),
    /**
     * 비고
     */
    REMARK("비고"),
    /**
     * 참여업체수
     */
    PARTICIPATING_COMPANY_COUNT("참여업체수"),
    /**
     * 전체동수
     */
    TOTAL_BUILDING_COUNT("전체동수"),
    /**
     * 대상동수
     */
    TARGET_BUILDING_COUNT("대상동수"),
    /**
     * 선정업체
     */
    WIN_COMPANY("선정업체"),
    /**
     * 금액
     */
    AMOUNT("금액"),
    /**
     * 동당단가
     */
    UNIT_BUILDING_PRICE("동당단가"),
    /**
     * 1순위
     */
    FIRST_RANK("1순위"),
    /**
     * 금액1
     */
    FIRST_RANK_AMOUNT("금액1"),
    /**
     * 동당단가1
     */
    FIRST_RANK_UNIT_BUILDING_PRICE("동당단가1"),
    /**
     * 2순위
     */
    SECOND_RANK("2순위"),
    /**
     * 금액2
     */
    SECOND_RANK_AMOUNT("금액2"),
    /**
     * 동당단가2
     */
    SECOND_RANK_UNIT_BUILDING_PRICE("동당단가2"),
    /**
     * 3순위
     */
    THIRD_RANK("3순위"),
    /**
     * 금액3
     */
    THIRD_RANK_AMOUNT("금액3"),
    /**
     * 동당단가3
     */
    THIRD_RANK_UNIT_BUILDING_PRICE("동당단가3"),
    /**
     * 4순위
     */
    FOURTH_RANK("4순위"),
    /**
     * 금액4
     */
    FOURTH_RANK_AMOUNT("금액4"),
    /**
     * 동당단가4
     */
    FOURTH_RANK_UNIT_BUILDING_PRICE("동당단가4"),
    /**
     * 5순위
     */
    FIFTH_RANK("5순위"),
    /**
     * 금액5
     */
    FIFTH_RANK_AMOUNT("금액5"),
    /**
     * 동당단가5
     */
    FIFTH_RANK_UNIT_BUILDING_PRICE("동당단가5"),
    /**
     * 6순위
     */
    SIXTH_RANK("6순위"),
    /**
     * 금액6
     */
    SIXTH_RANK_AMOUNT("금액6"),
    /**
     * 동당단가6
     */
    SIXTH_RANK_UNIT_BUILDING_PRICE("동당단가6"),
    ;
    private final String name;

    BidHeader(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
