package com.howoocast.hywtl_has.project_estimate.parameter;

import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectEstimateConfirmParameter {

    @NotNull(message = ProjectEstimate.KEY + ".estimate_id.not_null")
    private Long estimateId;
}
