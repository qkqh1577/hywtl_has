package com.howoocast.hywtl_has.personnel.parameter;

import java.util.List;
import javax.validation.constraints.NotEmpty;
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

    @NotEmpty(message = "직함 정보는 하나 이상 필수 항목입니다.")
    private List<PersonnelJobParameter> jobList;

    private List<PersonnelAcademicParameter> academicList;
}
