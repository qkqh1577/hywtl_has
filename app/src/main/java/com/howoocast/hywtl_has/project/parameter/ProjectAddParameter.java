package com.howoocast.hywtl_has.project.parameter;

import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectAddParameter {

    @NotNull(message = "project.basic.not-null")
    private ProjectBasicParameter basic;
}
