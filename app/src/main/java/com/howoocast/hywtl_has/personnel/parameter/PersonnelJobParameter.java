package com.howoocast.hywtl_has.personnel.parameter;

import com.howoocast.hywtl_has.personnel.domain.PersonnelJob;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonnelJobParameter {

    private Long departmentId;

    private String jobTitle;

    private String jobType;

    private String jobPosition;

    private String jobClass;

    private String jobDuty;

    @NotNull(message = PersonnelJob.KEY + ".is_representative.not_null")
    private Boolean isRepresentative;

}
