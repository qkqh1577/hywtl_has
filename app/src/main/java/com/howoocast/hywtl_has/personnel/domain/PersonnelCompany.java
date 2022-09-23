package com.howoocast.hywtl_has.personnel.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;

@Slf4j
@Getter
@Entity
@Table(name = PersonnelCompany.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class PersonnelCompany extends CustomEntity {

    public static final String KEY = "personnel_company";

    @NotNull
    @Column(nullable = false)
    protected LocalDate hiredDate; // 입사일

    @NotBlank
    @Column(nullable = false)
    protected String hiredType; // 입사 구분. [신입, 경력]

    protected String recommender; // 추천자

    public static PersonnelCompany of(
        LocalDate hiredDate,
        String hiredType,
        String recommender
    ) {
        return new PersonnelCompany(
            hiredDate,
            hiredType,
            recommender
        );
    }
}
