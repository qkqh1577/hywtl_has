package com.howoocast.hywtl_has.project_estimate.parameter;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectEstimateComplexSiteParameter {

    private String name;
    private Boolean withEnvironmentTest;
    private String estimateFigureDifficulty;
    private String figureDifficulty;
    private Long managerId;
}