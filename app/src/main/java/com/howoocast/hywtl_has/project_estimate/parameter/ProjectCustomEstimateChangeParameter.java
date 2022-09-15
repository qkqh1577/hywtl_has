package com.howoocast.hywtl_has.project_estimate.parameter;

import com.howoocast.hywtl_has.project_estimate.domain.ProjectCustomEstimate;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectCustomEstimateChangeParameter {

    @NotNull(message = ProjectCustomEstimate.KEY + ".is_sent.not_null")
    private Boolean isSent;

    @NotBlank(message = ProjectCustomEstimate.KEY + ".recipient.not_blank")
    private String recipient;

    @NotNull(message = ProjectCustomEstimate.KEY + ".business.not_null")
    private Long businessId;

    private String note;
}
