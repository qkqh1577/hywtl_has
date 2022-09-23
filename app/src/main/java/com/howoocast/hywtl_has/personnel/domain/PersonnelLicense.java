package com.howoocast.hywtl_has.personnel.domain;

import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class PersonnelLicense {

    public static final String KEY = "personnel_license";
    @NotBlank
    @Column(nullable = false)
    protected String name; // 면허 이름

    protected String type; // 종별

    @NotBlank
    @Column(nullable = false)
    protected String organizationName; // 발급기관명

    @NotBlank
    @Column(nullable = false)
    protected String qualifiedNumber; // 승인 번호

    @NotBlank
    @Column(nullable = false)
    protected LocalDate qualifiedDate; // 승인 일자

    protected String note; // 비고

    public static PersonnelLicense of(
        String name,
        String type,
        String organizationName,
        String qualifiedNumber,
        LocalDate qualifiedDate,
        String note
    ) {
        return new PersonnelLicense(
            name,
            type,
            organizationName,
            qualifiedNumber,
            qualifiedDate,
            note
        );
    }

}
