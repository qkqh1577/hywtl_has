package com.howoocast.hywtl_has.migration.enums;

public enum BusinessHeader {
    /**
     * 업체명 (풍네일)
     */
    NAME("업체명 (풍네일)"),

    /**
     * 부서
     */
    DEPARTMENT("부서"),

    /**
     * 담당자
     */
    BUSINESS_MANAGER("담당자"),

    /**
     * 직급
     */
    POSITION("직급"),

    /**
     * 회사 전화번호
     */
    OFFICE_PHONE("회사 전화번호"),

    /**
     * 전화번호(직통)
     */
    DIRECT_OFFICE_PHONE("전화번호(직통)"),

    /**
     * 핸드폰
     */
    MOBILE_PHONE("핸드폰"),

    /**
     * 이메일
     */
    EMAIL("이메일"),

    /**
     * 회사 주소
     */
    OFFICE_ADDRESS("회사 주소"),

    /**
     * 개인 주소
     */
    HOME_ADDRESS("개인 주소"),

    /**
     * 사업자등록번호
     */
    BUSINESS_REGISTRATION_NUMBER("사업자등록번호");

    public final String name;

    BusinessHeader(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }
}
