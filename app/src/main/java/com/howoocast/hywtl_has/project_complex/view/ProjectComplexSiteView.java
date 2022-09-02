package com.howoocast.hywtl_has.project_complex.view;

import com.howoocast.hywtl_has.project_complex.domain.ProjectComplexSite;
import com.howoocast.hywtl_has.user.view.UserShortView;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;
import lombok.Getter;

@Getter
public class ProjectComplexSiteView {

    private Long id;
    private String name;
    private Boolean withEnvironmentTest;
    private String estimateFigureDifficulty;
    private String figureDifficulty;
    private UserShortView manager;
    private LocalDateTime modifiedAt;


    public static ProjectComplexSiteView assemble(ProjectComplexSite source) {
        ProjectComplexSiteView target = new ProjectComplexSiteView();
        target.id = source.getId();
        target.name = source.getName();
        target.withEnvironmentTest = source.getWithEnvironmentTest();
        target.estimateFigureDifficulty = source.getEstimateFigureDifficulty();
        target.figureDifficulty = source.getFigureDifficulty();
        if (Objects.nonNull(source.getManager())) {
            target.manager = UserShortView.assemble(source.getManager());
        }
        target.modifiedAt = Optional.ofNullable(source.getModifiedAt()).orElse(source.getCreatedAt());
        return target;
    }
}
