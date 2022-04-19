package com.howoocast.hywtl_has.personnel.domain;

import java.time.LocalDate;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class PersonnelCompany {

    @NotNull
    @Column(nullable = false)
    protected LocalDate hiredDate; // 입사일

    @NotBlank
    @Column(nullable = false)
    protected String hiredType; // 입사 구분. [신입, 경력]

    protected String recommender; // 추천자

    @ElementCollection
    @NotEmpty
    protected List<PersonnelJob> jobList; // 직함 목록

    public static PersonnelCompany of(
        LocalDate hiredDate,
        String hiredType,
        String recommender,
        List<PersonnelJob> jobList
    ) {
        return new PersonnelCompany(
            hiredDate,
            hiredType,
            recommender,
            jobList
        );
    }
}
