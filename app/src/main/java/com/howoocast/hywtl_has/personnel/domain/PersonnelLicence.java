package com.howoocast.hywtl_has.personnel.domain;

import java.time.LocalDate;
import javax.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class PersonnelLicence {

    public static final String KEY = "personnel_licence";
    protected String name; // 면허 이름

    protected String type; // 종별

    protected String organizationName; // 발급기관명

    protected String qualifiedNumber; // 승인 번호

    protected LocalDate qualifiedDate; // 승인 일자

    protected String note; // 비고

    public static PersonnelLicence of(
        String name,
        String type,
        String organizationName,
        String qualifiedNumber,
        LocalDate qualifiedDate,
        String note
    ) {
        return new PersonnelLicence(
            name,
            type,
            organizationName,
            qualifiedNumber,
            qualifiedDate,
            note
        );
    }

}
