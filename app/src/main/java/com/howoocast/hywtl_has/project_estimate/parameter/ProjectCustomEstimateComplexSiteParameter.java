package com.howoocast.hywtl_has.project_estimate.parameter;

import com.howoocast.hywtl_has.project_estimate.domain.ProjectCustomEstimateComplexSite;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectCustomEstimateComplexSiteParameter {

    @NotNull(message = ProjectCustomEstimateComplexSite.KEY + ".id.not_null")
    private Long id;
    private String name;
    private Boolean withEnvironmentTest;
    private String estimateFigureDifficulty;
    private String figureDifficulty;
    private Long managerId;
}