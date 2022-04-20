package com.howoocast.hywtl_has.personnel.parameter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonnelJobParameter {

    @NotNull(message = "부서는 필수 항목입니다.")
    private Long departmentId;

    @NotBlank(message = "직함은 필수 항목입니다.")
    private String jobTitle;

    @NotBlank(message = "직종은 필수 항목입니다.")
    private String jobType;

    @NotBlank(message = "직위는 필수 항목입니다.")
    private String jobPosition;

    private String jobClass;

    private String jobDuty;
}
