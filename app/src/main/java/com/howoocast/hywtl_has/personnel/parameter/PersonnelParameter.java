package com.howoocast.hywtl_has.personnel.parameter;

import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonnelParameter {

    @NotNull(message = "유저 선택은 필수입니다.")
    private Long id;

    @NotNull(message = "유저 기본 정보는 필수입니다.")
    private PersonnelBasicParameter basic;

    @NotNull(message = "유저 회사 정보는 필수입니다.")
    private PersonnelCompanyParameter company;
}
