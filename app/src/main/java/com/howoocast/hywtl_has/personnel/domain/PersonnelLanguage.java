package com.howoocast.hywtl_has.personnel.domain;

import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class PersonnelLanguage {

    public static final String KEY = "personnel_language";
    @NotBlank
    @Column(nullable = false)
    protected String name; // 자격증명

    @NotBlank
    @Column(nullable = false)
    protected String type; // 대상 언어

    protected String grade; // 급수, 종류

    @NotBlank
    @Column(nullable = false)
    protected String organizationName; // 발급기관명

    @NotNull
    @Column(nullable = false)
    protected LocalDate certifiedDate; // 취득일

    protected String expiryPeriod; // 유효 기간

    public static PersonnelLanguage of(
        String name,
        String type,
        String grade,
        String organizationName,
        LocalDate certifiedDate,
        String expiryPeriod
    ) {
        return new PersonnelLanguage(
            name,
            type,
            grade,
            organizationName,
            certifiedDate,
            expiryPeriod
        );
    }
}
