package com.howoocast.hywtl_has.project.parameter;

import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.domain.ProjectEstimateType;
import com.howoocast.hywtl_has.project.domain.ProjectProgressStatus;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectAddParameter {

    @NotBlank(message = Project.KEY + ".name.not_blank")
    private String name;

    @NotBlank(message = Project.KEY + ".alias.not_blank")
    private String alias;

    @NotNull(message = Project.KEY + ".reception_manager.not_null")
    private Long receptionManagerId;

    @NotNull(message = Project.KEY + ".progress_status.not_null")
    private ProjectProgressStatus progressStatus;

    @NotNull(message = Project.KEY + ".estimate_type.not_null")
    private ProjectEstimateType estimateType;


}
