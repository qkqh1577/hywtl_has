package com.howoocast.hywtl_has.project_basic.parameter;

import com.howoocast.hywtl_has.business.domain.ProjectInvolvedType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectBasicBusinessAddParameter {


    private Long businessId;
    private Long businessManagerId;
    private ProjectInvolvedType involvedType;
}
