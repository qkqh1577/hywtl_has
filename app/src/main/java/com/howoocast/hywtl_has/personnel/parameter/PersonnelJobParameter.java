package com.howoocast.hywtl_has.personnel.parameter;

import com.howoocast.hywtl_has.common.parameter.CustomParameter;
import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.personnel.domain.PersonnelJob;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
public class PersonnelJobParameter extends CustomParameter<PersonnelJob> {

    @NotNull(message = "부서는 필수 항목입니다.")
    @Getter
    private Long departmentId;

    @NotBlank(message = "직함은 필수 항목입니다.")
    private String jobTitle;

    @NotBlank(message = "직종은 필수 항목입니다.")
    private String jobType;

    @NotBlank(message = "직위는 필수 항목입니다.")
    private String jobPosition;

    private String jobClass;

    private String jobDuty;

    private Department department;

    @Override
    public PersonnelJob build() {
        return PersonnelJob.of(
            department,
            jobTitle,
            jobType,
            jobPosition,
            jobClass,
            jobDuty
        );
    }
}
