package com.howoocast.hywtl_has.personnel.parameter;

import com.howoocast.hywtl_has.personnel.domain.PersonnelJob;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonnelJobParameter {

    @NotNull(message = PersonnelJob.KEY + ".department_id.not_null")
    private Long departmentId;

    @NotBlank(message = PersonnelJob.KEY + ".job_title.not_blank")
    private String jobTitle;

    @NotBlank(message = PersonnelJob.KEY + ".job_type.not_blank")
    private String jobType;

    @NotBlank(message = PersonnelJob.KEY + ".job_position.not_blank")
    private String jobPosition;

    private String jobClass;

    private String jobDuty;

    @NotNull(message = PersonnelJob.KEY + ".is_representative.not_null")
    private Boolean isRepresentative;

}
