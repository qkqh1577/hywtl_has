package com.howoocast.hywtl_has.project_basic.view;

import com.howoocast.hywtl_has.business.view.BusinessManagerShortView;
import com.howoocast.hywtl_has.business.view.BusinessShortView;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicExternalContributor;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;
import lombok.Getter;

@Getter
public class ProjectBasicExternalContributorView {

    private Long id;
    private Double rate;
    private BusinessShortView business;
    private BusinessManagerShortView businessManager;
    private LocalDateTime modifiedAt;

    public static ProjectBasicExternalContributorView assemble(ProjectBasicExternalContributor source) {
        ProjectBasicExternalContributorView target = new ProjectBasicExternalContributorView();
        target.id = source.getId();
        target.rate = source.getRate();
        if (Objects.nonNull(source.getBusiness())) {
            target.business = BusinessShortView.assemble(source.getBusiness());
        }
        if (Objects.nonNull(source.getBusinessManager())) {
            target.businessManager = BusinessManagerShortView.assemble(source.getBusinessManager());
        }
        target.modifiedAt = Optional.ofNullable(source.getModifiedAt()).orElse(source.getCreatedAt());
        return target;
    }
}
