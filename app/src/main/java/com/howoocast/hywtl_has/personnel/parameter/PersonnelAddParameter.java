package com.howoocast.hywtl_has.personnel.parameter;

import com.howoocast.hywtl_has.common.parameter.FileItemParameter;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonnelAddParameter {

    @Getter
    @Setter
    public static class PersonnelBasicAddParameter {

        private String engName;
        private String birthDate;
        private String sex;
        private FileItemParameter imageFile;
        private String address;

        private String phone;
        private String emergencyPhone;
        private String relationship;
        private String personalEmail;

    }

    @NotNull(message = "유저 선택은 필수입니다.")
    private Long userId;

    @NotNull(message = "유저 기본 정보는 필수입니다.")
    private PersonnelBasicAddParameter basic;
}

