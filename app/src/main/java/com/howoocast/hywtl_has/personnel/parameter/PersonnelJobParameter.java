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

    @NotNull(message = "personnel.job.department-id.not-null")
    @Getter
    private Long departmentId;

    @NotBlank(message = "personnel.job.job-title.not-blank")
    private String jobTitle;

    @NotBlank(message = "personnel.job.job-type.not-blank")
    private String jobType;

    @NotBlank(message = "personnel.job.job-position.not-blank")
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
