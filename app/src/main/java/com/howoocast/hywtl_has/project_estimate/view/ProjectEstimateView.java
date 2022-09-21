package com.howoocast.hywtl_has.project_estimate.view;

import com.howoocast.hywtl_has.business.view.BusinessShortView;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectCustomEstimate;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectSystemEstimate;
import com.howoocast.hywtl_has.user.view.UserShortView;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.NONE)
public class ProjectEstimateView {

    private final Long id;
    private final String code;
    private final String type;
    private final Boolean isSent;
    private final Boolean confirmed;
    private final String recipient;
    private final UserShortView createdBy;
    private final LocalDateTime createdAt;
    private final LocalDateTime modifiedAt;
    private ProjectEstimatePlanView plan;
    private List<ProjectEstimateComplexSiteView> siteList;
    private List<ProjectEstimateComplexBuildingView> buildingList;
    private final BusinessShortView business;

    protected ProjectEstimateView(
        ProjectEstimate source
    ) {
        this.id = source.getId();
        this.code = source.getCode();
        this.type = source.getType();
        this.isSent = source.getIsSent();
        this.confirmed = source.getConfirmed();
        this.recipient = source.getRecipient();
        this.createdBy = UserShortView.assemble(source.getWriter());
        this.createdAt = source.getCreatedAt();
        this.modifiedAt = Optional.ofNullable(source.getModifiedAt()).orElse(source.getCreatedAt());
        if (Objects.nonNull(source.getPlan())) {
            this.plan = ProjectEstimatePlanView.assemble(source.getPlan());
        }
        if (Objects.nonNull(source.getSiteList())) {
            this.siteList = source.getSiteList().stream().map(ProjectEstimateComplexSiteView::assemble)
                .collect(Collectors.toList());
        }
        if (Objects.nonNull(source.getBuildingList())) {
            this.buildingList = source.getBuildingList().stream().map(ProjectEstimateComplexBuildingView::assemble)
                .collect(
                    Collectors.toList());
        }
        this.business = BusinessShortView.assemble(source.getBusiness());
    }

    public static ProjectEstimateView assemble(ProjectEstimate source) {
        if (source.getType().equals("SYSTEM")) {
            return ProjectSystemEstimateView.assemble((ProjectSystemEstimate) source);
        } else {
            return ProjectCustomEstimateView.assemble((ProjectCustomEstimate) source);
        }
    }
}
