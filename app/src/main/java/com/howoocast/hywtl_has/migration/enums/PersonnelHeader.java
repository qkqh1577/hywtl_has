package com.howoocast.hywtl_has.migration.enums;

public enum PersonnelHeader {
    EMPLOYEE_ID("사원번호"),
    DEPARTMENT_CATEGORY("구분"),
    DEPARTMENT_NAME("부서명"),
    EMPLOYEE_NAME("성명"),
    POSITION("직위/직급명"),
    DUTY("직책"),
    JOIN_DATE("입사일"),
    MOBILE("모바일"),
    COMPANY_EMAIL("회사Email"),
    PERSONAL_EMAIL("Email"),
    BIRTH_DATE("생년월일(주민번호)"),
    SEX("성별");

    private final String name;
    PersonnelHeader(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
