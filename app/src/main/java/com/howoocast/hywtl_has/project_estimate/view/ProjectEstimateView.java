package com.howoocast.hywtl_has.project_estimate.view;

import com.howoocast.hywtl_has.business.view.BusinessShortView;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
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
    private final String type;
    private final Boolean isSent;
    private final Boolean confirmed;
    private final String recipient;
    private final BusinessShortView business;
    private final UserShortView createdBy;
    private final LocalDateTime createdAt;
    private final LocalDateTime modifiedAt;

    protected ProjectEstimateView(
        ProjectEstimate source
    ) {
        this.id = source.getId();
        this.code = source.getCode();
        this.type = source.getType();
        this.isSent = source.getIsSent();
        this.confirmed = source.getConfirmed();
        this.recipient = source.getRecipient();
        this.business = BusinessShortView.assemble(source.getBusiness());
        this.createdBy = UserShortView.assemble(source.getWriter());
        this.createdAt = source.getCreatedAt();
        this.modifiedAt = source.getModifiedAt();
    }

}
