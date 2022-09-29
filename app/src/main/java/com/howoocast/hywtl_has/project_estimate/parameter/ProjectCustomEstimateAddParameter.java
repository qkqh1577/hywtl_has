package com.howoocast.hywtl_has.project_estimate.parameter;

import com.howoocast.hywtl_has.file.parameter.FileItemParameter;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectCustomEstimate;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectCustomEstimateAddParameter {

    @NotNull(message = ProjectCustomEstimate.KEY + ".is_sent.not_null")
    private Boolean isSent;

    @NotBlank(message = ProjectCustomEstimate.KEY + ".recipient.not_blank")
    private String recipient;

    @NotNull(message = ProjectCustomEstimate.KEY + ".business.not_null")
    private Long businessId;

    private String note;

    private Boolean isLh;

    private FileItemParameter file;

    @NotNull(message = ProjectCustomEstimate.KEY + ".type.not_null")
    private ProjectEstimateType type;

}
