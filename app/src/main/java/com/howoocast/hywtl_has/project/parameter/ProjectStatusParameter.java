package com.howoocast.hywtl_has.project.parameter;

import com.howoocast.hywtl_has.project.common.ProjectStatus;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectStatusParameter {

    @NotNull(message = "project.basic.status.not-null")
    private ProjectStatus status;

}
