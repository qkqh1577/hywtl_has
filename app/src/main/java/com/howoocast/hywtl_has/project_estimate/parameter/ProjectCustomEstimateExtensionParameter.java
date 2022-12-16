package com.howoocast.hywtl_has.project_estimate.parameter;

import com.howoocast.hywtl_has.project_estimate.domain.ProjectSystemEstimate;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectCustomEstimateExtensionParameter {

    @Valid
    private ProjectEstimatePlanParameter plan;
    @NotEmpty(message = ProjectSystemEstimate.KEY + ".site_list.not_empty")
    private List<ProjectEstimateComplexSiteParameter> siteList;
    @NotEmpty(message = ProjectSystemEstimate.KEY + ".building_list.not_empty")
    private List<ProjectEstimateComplexBuildingParameter> buildingList;
}
