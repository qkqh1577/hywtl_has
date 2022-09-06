package com.howoocast.hywtl_has.project_estimate.view;

import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateType;
import com.howoocast.hywtl_has.user.view.UserShortView;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.NONE)
public abstract class ProjectEstimateView {

    private final Long id;
    private final String code;
    private final ProjectEstimateType type;
    private final Boolean isSent;
    private final Boolean confirmed;
    private final String business;
    private final UserShortView createdBy;
    private final LocalDateTime createdAt;
    private final LocalDateTime modifiedAt;

    protected ProjectEstimateView(
        ProjectEstimate source
    ) {
        this.id = source.getId();
        this.code = source.getCode();
        this.type = ProjectEstimateType.valueOf(source.getType());
        this.isSent = source.getIsSent();
        this.confirmed = source.getConfirmed();
        this.business = source.getBusiness();
        this.createdBy = UserShortView.assemble(source.getWriter());
        this.createdAt = source.getCreatedAt();
        this.modifiedAt = source.getModifiedAt();
    }

}
