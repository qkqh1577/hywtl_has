package com.howoocast.hywtl_has.project_estimate.parameter;

import com.howoocast.hywtl_has.file.parameter.FileItemParameter;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectCustomEstimateAddParameter {

    @NotNull
    private Boolean isSent;

    @NotBlank
    private String business;

    private String note;

    private FileItemParameter file;

    private ProjectEstimateType type;

}
