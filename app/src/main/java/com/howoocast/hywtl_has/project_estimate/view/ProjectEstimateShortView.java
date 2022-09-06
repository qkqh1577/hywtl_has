package com.howoocast.hywtl_has.project_estimate.view;

import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateType;
import com.howoocast.hywtl_has.user.view.UserShortView;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ProjectEstimateShortView {

    private Long id;
    private String code;
    private ProjectEstimateType type;
    private Boolean isSent;
    private Boolean confirmed;
    private String business;
    private UserShortView createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public static ProjectEstimateShortView assemble(ProjectEstimate source) {
        ProjectEstimateShortView target = new ProjectEstimateShortView();
        target.id = source.getId();
        target.code = source.getCode();
        target.type = ProjectEstimateType.valueOf(source.getType());
        target.isSent = source.getIsSent();
        target.confirmed = source.getConfirmed();
        target.business = source.getBusiness();
        target.createdBy = UserShortView.assemble(source.getWriter());
        target.createdAt = source.getCreatedAt();
        target.modifiedAt = source.getModifiedAt();
        return target;
    }
}