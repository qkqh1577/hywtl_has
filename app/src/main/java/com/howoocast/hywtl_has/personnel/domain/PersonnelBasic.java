package com.howoocast.hywtl_has.personnel.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.file.domain.FileItem;
import java.time.LocalDate;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;
import org.springframework.lang.Nullable;

@Slf4j
@Getter
@Entity
@Table(name = PersonnelBasic.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class PersonnelBasic extends CustomEntity {

    public static final String KEY = "personnel_basic";

    protected String engName; // 영문이름

    protected LocalDate birthDate; // 생년월일

    protected String sex; //성별

    @OneToOne
    @JoinColumn(name = "image_id")
    protected FileItem image; // 사진

    protected String address; // 거주지 주소

    protected String phone; // 연락처(핸드폰)

    protected String emergencyPhone; // 비상연락망

    protected String relationship; // 비상연락망- 사원과의관계

    protected String personalEmail; // 개인 이메일

    public static PersonnelBasic of(
        @Nullable String engName,
        @Nullable LocalDate birthDate,
        @Nullable String sex,
        @Nullable FileItem fileItem,
        @Nullable String address,
        @Nullable String phone,
        @Nullable String emergencyPhone,
        @Nullable String relationship,
        @Nullable String personalEmail
    ) {
        return new PersonnelBasic(
            engName,
            birthDate,
            sex,
            fileItem,
            address,
            phone,
            emergencyPhone,
            relationship,
            personalEmail
        );
    }
}
