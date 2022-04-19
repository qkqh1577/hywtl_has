package com.howoocast.hywtl_has.personnel.view;

import com.howoocast.hywtl_has.common.view.FileItemView;
import com.howoocast.hywtl_has.personnel.domain.PersonnelBasic;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonnelBasicView {

    private String engName; // 영문이름

    private String birthDate; // 생년월일

    private String sex; //성별

    private FileItemView image; // 사진

    private String address; // 거주지 주소

    private String phone; // 연락처(핸드폰)

    private String emergencyPhone; // 비상연락망

    private String relationship; // 비상연락망- 사원과의관계

    private String personalEmail; // 개인 이메일

    public static PersonnelBasicView assemble(PersonnelBasic source) {
        PersonnelBasicView target = new PersonnelBasicView();
        target.engName = source.getEngName();
        target.birthDate = source.getBirthDate();
        target.sex = source.getSex();
        target.image = FileItemView.assemble(source.getImage());
        target.address = source.getAddress();
        target.phone = source.getPhone();
        target.emergencyPhone = source.getEmergencyPhone();
        target.relationship = source.getRelationship();
        target.personalEmail = source.getPersonalEmail();
        return target;
    }
}
