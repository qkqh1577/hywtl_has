package com.howoocast.hywtl_has.personnel.domain;

import com.howoocast.hywtl_has.common.domain.FileItem;
import java.time.LocalDate;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class PersonnelBasic {

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
        String engName,
        LocalDate birthDate,
        String sex,
        @Nullable FileItem fileItem,
        String address,
        String phone,
        String emergencyPhone,
        String relationship,
        String personalEmail
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
