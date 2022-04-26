package com.howoocast.hywtl_has.project.parameter;

import com.howoocast.hywtl_has.project.common.ProjectStatus;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectBasicParameter {

    @NotBlank(message = "project.basic.name.not-blank")
    private String name;

    private String alias;

    @NotNull(message = "project.basic.status.not-null")
    private ProjectStatus status;

    @NotNull(message = "project.basic.sales-manager-id.not-null")
    private Long salesManagerId;

    @NotNull(message = "project.basic.project-manager-id.not-null")
    private Long projectManagerId;

}
