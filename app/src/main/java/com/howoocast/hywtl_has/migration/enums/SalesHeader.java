package com.howoocast.hywtl_has.migration.enums;

public enum SalesHeader {
    /**
     * 프로젝트 코드
     */
    CODE("PN"),
    /**
     * 구분
     */
    CONFIRM("구분"),
    /**
     * LH
     */
    LH("LH"),
    /**
     * 프로젝트명
     */
    NAME("프로젝트명"),
    /**
     * 업체구분
     */
    COMPANY_TYPE("업체구분"),
    /**
     * 업체명
     */
    COMPANY_NAME("업체명"),
    /**
     * 계약상태
     */
    CONTRACT_STATUS("계약상태"),
    /**
     * 수금상태
     */
    RECEIPT_STATUS("수금상태"),
    /**
     * 최종상태
     */
    FINAL_STATUS("최종상태"),
    /**
     * 총수주액
     */
    TOTAL_AMOUNT("총수주액"),
    /**
     * 수금액
     */
    RECEIPT_AMOUNT("수금액"),
    /**
     * 수주잔고
     */
    BALANCE_AMOUNT("수주잔고"),
    /**
     * 풍력수량
     */
    WINDMILL_AMOUNT("풍력수량"),
    /**
     * 풍압수량
     */
    WIND_PRESSURE_AMOUNT("풍압수량"),
    /**
     * 풍환경수량
     */
    WIND_ENVIRONMENT_AMOUNT("풍환경수량"),
    /**
     * 공기력수량
     */
    AIR_AMOUNT("공기력수량"),
    /**
     * 빌딩풍수량
     */
    BUILDING_AMOUNT("빌딩풍수량"),
    /**
     * 구검수량
     */
    INSPECTION_AMOUNT("구검수량"),
    /**
     * 공동단가
     */
    COMMON_UNIT_PRICE("공동단가"),
    /**
     * 풍력단가
     */
    WINDMILL_UNIT_PRICE("풍력단가"),
    /**
     * 풍압단가
     */
    WIND_PRESSURE_UNIT_PRICE("풍압단가"),
    /**
     * 풍환경단가
     */
    WIND_ENVIRONMENT_UNIT_PRICE("풍환경단가"),
    /**
     * 공기력단가
     */
    AIR_UNIT_PRICE("공기력단가"),
    /**
     * 빌딩풍단가
     */
    BUILDING_UNIT_PRICE("빌딩풍단가"),
    /**
     * 구검단가
     */
    INSPECTION_UNIT_PRICE("구검단가"),
    /**
     * 구검비
     */
    INSPECTION_PRICE("구검비"),
    /**
     * 풍동금액
     */
    TOTAL_AMOUNT_OF_HANYANG("풍동금액"),
    /**
     * 설계풍하중
     */
    DESIGN_WIND_LOAD("설계풍하중"),
    /**
     * 최종보고서
     */
    FINAL_REPORT("최종보고서"),
    /**
     * 견적일
     */
    ESTIMATE_DATE("견적일"),
    /**
     * 프로젝트생산일
     */
    PROJECT_CREATED_DATE("프로젝트생산일"),
    /**
     * 착수예상일
     */
    START_EXPECTED_DATE("착수예상일"),
    /**
     * 수주적용여부
     */
    APPLY_ORDER("수주적용여부"),
    /**
     * 수주일
     */
    ORDER_DATE("수주일"),
    /**
     * pm지정일
     */
    PM_ASSIGN_DATE("pm지정일"),
    /**
     * 계약일
     */
    CONTRACT_DATE("계약일"),
    /**
     * 업무착수일
     */
    WORK_START_DATE("업무착수일"),
    /**
     * 착수기한
     */
    START_DEADLINE("착수기한"),
    /**
     * 선급금금액
     */
    ADVANCE_AMOUNT("선급금금액"),
    /**
     * 선급금비율
     */
    ADVANCE_RATE("선급금비율"),
    /**
     * 선급금지급시기
     */
    ADVANCE_PAYMENT_TIME("선급금지급시기"),
    /**
     * 중도금1금액
     */
    MIDDLE_AMOUNT_1("중도금1금액"),
    /**
     * 중도금1비율
     */
    MIDDLE_RATE_1("중도금1비율"),
    /**
     * 중도금1지급시기
     */
    MIDDLE_PAYMENT_TIME_1("중도금1지급시기"),
    /**
     * 중도금2금액
     */
    MIDDLE_AMOUNT_2("중도금2금액"),
    /**
     * 중도금2비율
     */
    MIDDLE_RATE_2("중도금2비율"),
    /**
     * 중도금2지급시기
     */
    MIDDLE_PAYMENT_TIME_2("중도금2지급시기"),
    /**
     * 중도금3금액
     */
    MIDDLE_AMOUNT_3("중도금3금액"),
    /**
     * 중도금3비율
     */
    MIDDLE_RATE_3("중도금3비율"),
    /**
     * 중도금3지급시기
     */
    MIDDLE_PAYMENT_TIME_3("중도금3지급시기"),
    /**
     * 잔금금액
     */
    BALANCE_COLLECTION_AMOUNT("잔금금액"),
    /**
     * 잔금비율
     */
    BALANCE_COLLECTION_RATE("잔금비율"),
    /**
     * 잔금지급시기
     */
    BALANCE_COLLECTION_TIME("잔금지급시기"),
    /**
     * 총 기성 공급가액
     */
    TOTAL_CONSTRUCTION_SUPPLY_AMOUNT("총기성공급가액"),
    /**
     * 총 기성 부가세
     */
    TOTAL_CONSTRUCTION_VAT("총기성부가세액"),
    /**
     * 총 기성 합계 금액
     */
    TOTAL_CONSTRUCTION_SUM("총기성합계금액"),
    /**
     * 입금액
     */
    DEPOSIT_AMOUNT("입금액"),
    /**
     * 세금계산서
     */
    TAX_INVOICE("세금계산서"),
    /**
     * 선급금입금일
     */
    ADVANCE_DEPOSIT_DATE("선급금입금일"),
    /**
     * 선급금입금액
     */
    ADVANCE_DEPOSIT_AMOUNT("선급금입금액"),
    /**
     * 선급금세계날짜
     */
    ADVANCE_DEPOSIT_VAT_DATE("선급금세계날짜"),
    /**
     * 선급금세계금액
     */
    ADVANCE_DEPOSIT_VAT_AMOUNT("선급금세계금액"),
    /**
     * 중도금1입금일
     */
    MIDDLE_DEPOSIT_DATE_1("중도금1입금일"),
    /**
     * 중도금1입금액
     */
    MIDDLE_DEPOSIT_AMOUNT_1("중도금1입금액"),
    /**
     * 중도금1세계날짜
     */
    MIDDLE_DEPOSIT_VAT_DATE_1("중도금1세계날짜"),
    /**
     * 중도금1세계금액
     */
    MIDDLE_DEPOSIT_VAT_AMOUNT_1("중도금1세계금액"),
    /**
     * 중도금2입금일
     */
    MIDDLE_DEPOSIT_DATE_2("중도금2입금일"),
    /**
     * 중도금2입금액
     */
    MIDDLE_DEPOSIT_AMOUNT_2("중도금2입금액"),
    /**
     * 중도금2세계날짜
     */
    MIDDLE_DEPOSIT_VAT_DATE_2("중도금2세계날짜"),
    /**
     * 중도금2세계금액
     */
    MIDDLE_DEPOSIT_VAT_AMOUNT_2("중도금2세계금액"),
    /**
     * 중도금3입금일
     */
    MIDDLE_DEPOSIT_DATE_3("중도금3입금일"),
    /**
     * 중도금3입금액
     */
    MIDDLE_DEPOSIT_AMOUNT_3("중도금3입금액"),
    /**
     * 중도금3세계날짜
     */
    MIDDLE_DEPOSIT_VAT_DATE_3("중도금3세계날짜"),
    /**
     * 중도금3세계금액
     */
    MIDDLE_DEPOSIT_VAT_AMOUNT_3("중도금3세계금액"),
    /**
     * 잔금입금일
     */
    BALANCE_COLLECTION_DEPOSIT_DATE("잔금입금일"),
    /**
     * 잔금입금액
     */
    BALANCE_COLLECTION_DEPOSIT_AMOUNT("잔금입금액"),
    /**
     * 잔금세계날짜
     */
    BALANCE_COLLECTION_VAT_DATE("잔금세계날짜"),
    /**
     * 잔금세계금액
     */
    BALANCE_COLLECTION_VAT_AMOUNT("잔금세계금액"),
    /**
     * 견적처1업체명
     */
    ESTIMATE_COMPANY_NAME_1("견적처1업체명"),
    /**
     * 견적처1부서명
     */
    ESTIMATE_COMPANY_DEPARTMENT_NAME_1("견적처1부서명"),
    /**
     * 견적처1담당자
     */
    ESTIMATE_COMPANY_MANAGER_1("견적처1담당자"),
    /**
     * 견적처1직급
     */
    ESTIMATE_COMPANY_POSITION_1("견적처1직급"),
    /**
     * 견적처1연락처
     */
    ESTIMATE_COMPANY_PHONE_NUMBER_1("견적처1연락처"),
    /**
     * 견적처1이메일
     */
    ESTIMATE_COMPANY_EMAIL_1("견적처1이메일"),
    /**
     * 견적처2업체명
     */
    ESTIMATE_COMPANY_NAME_2("견적처2업체명"),
    /**
     * 견적처2부서명
     */
    ESTIMATE_COMPANY_DEPARTMENT_NAME_2("견적처2부서명"),
    /**
     * 견적처2담당자
     */
    ESTIMATE_COMPANY_MANAGER_2("견적처2담당자"),
    /**
     * 견적처2직급
     */
    ESTIMATE_COMPANY_POSITION_2("견적처2직급"),
    /**
     * 견적처2연락처
     */
    ESTIMATE_COMPANY_PHONE_NUMBER_2("견적처2연락처"),
    /**
     * 견적처2이메일
     */
    ESTIMATE_COMPANY_EMAIL_2("견적처2이메일"),
    /**
     * 발주사1업체명
     */
    ORDER_COMPANY_NAME_1("발주사1업체명"),
    /**
     * 발주사1부서명
     */
    ORDER_COMPANY_DEPARTMENT_NAME_1("발주사1부서명"),
    /**
     * 발주사1담당자
     */
    ORDER_COMPANY_MANAGER_1("발주사1담당자"),
    /**
     * 발주사1직급
     */
    ORDER_COMPANY_POSITION_1("발주사1직급"),
    /**
     * 발주사1연락처
     */
    ORDER_COMPANY_PHONE_NUMBER_1("발주사1연락처"),
    /**
     * 발주사1이메일
     */
    ORDER_COMPANY_EMAIL_1("발주사1이메일"),
    /**
     * 발주사2업체명
     */
    ORDER_COMPANY_NAME_2("발주사2업체명"),
    /**
     * 발주사2부서명
     */
    ORDER_COMPANY_DEPARTMENT_NAME_2("발주사2부서명"),
    /**
     * 발주사2담당자
     */
    ORDER_COMPANY_MANAGER_2("발주사2담당자"),
    /**
     * 발주사2직급
     */
    ORDER_COMPANY_POSITION_2("발주사2직급"),
    /**
     * 발주사2연락처
     */
    ORDER_COMPANY_PHONE_NUMBER_2("발주사2연락처"),
    /**
     * 발주사2이메일
     */
    ORDER_COMPANY_EMAIL_2("발주사2이메일"),
    /**
     * 발주사3업체명
     */
    ORDER_COMPANY_NAME_3("발주사3업체명"),
    /**
     * 발주사3부서명
     */
    ORDER_COMPANY_DEPARTMENT_NAME_3("발주사3부서명"),
    /**
     * 발주사3담당자
     */
    ORDER_COMPANY_MANAGER_3("발주사3담당자"),
    /**
     * 발주사3직급
     */
    ORDER_COMPANY_POSITION_3("발주사3직급"),
    /**
     * 발주사3연락처
     */
    ORDER_COMPANY_PHONE_NUMBER_3("발주사3연락처"),
    /**
     * 발주사3이메일
     */
    ORDER_COMPANY_EMAIL_3("발주사3이메일"),
    /**
     * 건축1업체명
     */
    ARCHITECTURE_COMPANY_NAME_1("건축1업체명"),
    /**
     * 건축1부서명
     */
    ARCHITECTURE_COMPANY_DEPARTMENT_NAME_1("건축1부서명"),
    /**
     * 건축1담당자
     */
    ARCHITECTURE_COMPANY_MANAGER_1("건축1담당자"),
    /**
     * 건축1직급
     */
    ARCHITECTURE_COMPANY_POSITION_1("건축1직급"),
    /**
     * 건축1연락처
     */
    ARCHITECTURE_COMPANY_PHONE_NUMBER_1("건축1연락처"),
    /**
     * 건축1이메일
     */
    ARCHITECTURE_COMPANY_EMAIL_1("건축1이메일"),
    /**
     * 건축2업체명
     */
    ARCHITECTURE_COMPANY_NAME_2("건축2업체명"),
    /**
     * 건축2부서명
     */
    ARCHITECTURE_COMPANY_DEPARTMENT_NAME_2("건축2부서명"),
    /**
     * 건축2담당자
     */
    ARCHITECTURE_COMPANY_MANAGER_2("건축2담당자"),
    /**
     * 건축2직급
     */
    ARCHITECTURE_COMPANY_POSITION_2("건축2직급"),
    /**
     * 건축2연락처
     */
    ARCHITECTURE_COMPANY_PHONE_NUMBER_2("건축2연락처"),
    /**
     * 건축2이메일
     */
    ARCHITECTURE_COMPANY_EMAIL_2("건축2이메일"),
    /**
     * 건축3업체명
     */
    ARCHITECTURE_COMPANY_NAME_3("건축3업체명"),
    /**
     * 건축3부서명
     */
    ARCHITECTURE_COMPANY_DEPARTMENT_NAME_3("건축3부서명"),
    /**
     * 건축3담당자
     */
    ARCHITECTURE_COMPANY_MANAGER_3("건축3담당자"),
    /**
     * 건축3직급
     */
    ARCHITECTURE_COMPANY_POSITION_3("건축3직급"),
    /**
     * 건축3연락처
     */
    ARCHITECTURE_COMPANY_PHONE_NUMBER_3("건축3연락처"),
    /**
     * 건축3이메일
     */
    ARCHITECTURE_COMPANY_EMAIL_3("건축3이메일"),
    /**
     * 구조설계1업체명
     */
    STRUCTURE_DESIGN_COMPANY_NAME_1("구조설계1업체명"),
    /**
     * 구조설계1부서명
     */
    STRUCTURE_DESIGN_COMPANY_DEPARTMENT_NAME_1("구조설계1부서명"),
    /**
     * 구조설계1담당자
     */
    STRUCTURE_DESIGN_COMPANY_MANAGER_1("구조설계1담당자"),
    /**
     * 구조설계1직급
     */
    STRUCTURE_DESIGN_COMPANY_POSITION_1("구조설계1직급"),
    /**
     * 구조설계1연락처
     */
    STRUCTURE_DESIGN_COMPANY_PHONE_NUMBER_1("구조설계1연락처"),
    /**
     * 구조설계1이메일
     */
    STRUCTURE_DESIGN_COMPANY_EMAIL_1("구조설계1이메일"),
    /**
     * 구조설계2업체명
     */
    STRUCTURE_DESIGN_COMPANY_NAME_2("구조설계2업체명"),
    /**
     * 구조설계2부서명
     */
    STRUCTURE_DESIGN_COMPANY_DEPARTMENT_NAME_2("구조설계2부서명"),
    /**
     * 구조설계2담당자
     */
    STRUCTURE_DESIGN_COMPANY_MANAGER_2("구조설계2담당자"),
    /**
     * 구조설계2직급
     */
    STRUCTURE_DESIGN_COMPANY_POSITION_2("구조설계2직급"),
    /**
     * 구조설계2연락처
     */
    STRUCTURE_DESIGN_COMPANY_PHONE_NUMBER_2("구조설계2연락처"),
    /**
     * 구조설계2이메일
     */
    STRUCTURE_DESIGN_COMPANY_EMAIL_2("구조설계2이메일"),
    /**
     * 구조설계3업체명
     */
    STRUCTURE_DESIGN_COMPANY_NAME_3("구조설계3업체명"),
    /**
     * 구조설계3부서명
     */
    STRUCTURE_DESIGN_COMPANY_DEPARTMENT_NAME_3("구조설계3부서명"),
    /**
     * 구조설계3담당자
     */
    STRUCTURE_DESIGN_COMPANY_MANAGER_3("구조설계3담당자"),
    /**
     * 구조설계3직급
     */
    STRUCTURE_DESIGN_COMPANY_POSITION_3("구조설계3직급"),
    /**
     * 구조설계3연락처
     */
    STRUCTURE_DESIGN_COMPANY_PHONE_NUMBER_3("구조설계3연락처"),
    /**
     * 구조설계3이메일
     */
    STRUCTURE_DESIGN_COMPANY_EMAIL_3("구조설계3이메일"),
    /**
     * 전달자업체명
     */
    DELIVERY_COMPANY_NAME("전달자업체명"),
    /**
     * 전달자부서명
     */
    DELIVERY_COMPANY_DEPARTMENT_NAME("전달자부서명"),
    /**
     * 전달자담당자
     */
    DELIVERY_COMPANY_MANAGER("전달자담당자"),
    /**
     * 전달자직급
     */
    DELIVERY_COMPANY_POSITION("전달자직급"),
    /**
     * 전달자연락처
     */
    DELIVERY_COMPANY_PHONE_NUMBER("전달자연락처"),
    /**
     * 전달자이메일
     */
    DELIVERY_COMPANY_EMAIL("전달자이메일"),
    /**
     * 소개자업체명
     */
    INTRODUCER_COMPANY_NAME("소개자업체명"),
    /**
     * 소개자부서명
     */
    INTRODUCER_COMPANY_DEPARTMENT_NAME("소개자부서명"),
    /**
     * 소개자담당자
     */
    INTRODUCER_COMPANY_MANAGER("소개자담당자"),
    /**
     * 소개자직급
     */
    INTRODUCER_COMPANY_POSITION("소개자직급"),
    /**
     * 소개자연락처
     */
    INTRODUCER_COMPANY_PHONE_NUMBER("소개자연락처"),
    /**
     * 소개자이메일
     */
    INTRODUCER_COMPANY_EMAIL("소개자이메일"),
    /**
     * 소개자지급월
     */
    INTRODUCER_PAYMENT_MONTH("소개자지급월"),
    /**
     * 소개자지급액
     */
    INTRODUCER_PAYMENT_AMOUNT("소개자지급액"),
    /**
     * 소개자지급여부
     */
    INTRODUCER_PAYMENT_STATUS("소개자지급여부");

    private final String name;
    SalesHeader(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }
}
