package com.howoocast.hywtl_has.personnel.domain;

import javax.persistence.Embeddable;
import lombok.Getter;

@Getter
@Embeddable
public class PersonnelBasic {

    protected String engName; // 영문이름

    protected String birthDate; // 생년월일

    protected String sex; //성별

    protected String image; // 사진

    protected String address; // 거주지 주소

    protected String phone; // 연락처(핸드폰)

    protected String emergencyPhone; // 비상연락망

    protected String relationship; // 비상연락망- 사원과의관계

    protected String personalEmail; // 개인 이메일
}
