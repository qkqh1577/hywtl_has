package com.howoocast.hywtl_has.project_estimate.view;

import com.howoocast.hywtl_has.project_estimate.domain.ProjectCustomEstimateComplexSite;
import com.howoocast.hywtl_has.user.view.UserShortView;
import java.util.Objects;
import lombok.Getter;

@Getter
public class ProjectCustomEstimateComplexSiteView {

    private Long id;
    private String name;
    private Boolean withEnvironmentTest;
    private String estimateFigureDifficulty;
    private String figureDifficulty;
    private UserShortView manager;

    public static ProjectCustomEstimateComplexSiteView assemble(ProjectCustomEstimateComplexSite source) {
        ProjectCustomEstimateComplexSiteView target = new ProjectCustomEstimateComplexSiteView();
        target.id = source.getId();
        target.name = source.getName();
        target.withEnvironmentTest = source.getWithEnvironmentTest();
        target.estimateFigureDifficulty = source.getEstimateFigureDifficulty();
        target.figureDifficulty = source.getFigureDifficulty();

        if (Objects.nonNull(source.getManager())) {
            target.manager = UserShortView.assemble(source.getManager());
        }
        return target;
    }
}
