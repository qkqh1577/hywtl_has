package com.howoocast.hywtl_has.project_basic.parameter;

import com.howoocast.hywtl_has.business.domain.ProjectInvolvedType;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicBusiness;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectBasicBusinessAddParameter {

    @NotNull(message = ProjectBasicBusiness.KEY + ".business_id.not_null")
    private Long businessId;

    @NotNull(message = ProjectBasicBusiness.KEY + ".business_manager_id.not_null")
    private Long businessManagerId;

    @NotNull(message = ProjectBasicBusiness.KEY + ".involved_type.not_null")
    private ProjectInvolvedType involvedType;
}
