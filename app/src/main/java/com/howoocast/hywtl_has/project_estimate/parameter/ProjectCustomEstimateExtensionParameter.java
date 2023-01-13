package com.howoocast.hywtl_has.project_estimate.parameter;

import java.util.List;
import javax.validation.Valid;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectCustomEstimateExtensionParameter {

    @Valid
    private ProjectEstimatePlanParameter plan;
    private List<ProjectEstimateComplexSiteParameter> siteList;
    private List<ProjectEstimateComplexBuildingParameter> buildingList;
}
