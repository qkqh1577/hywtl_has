package com.howoocast.hywtl_has.project_estimate.view;

import com.howoocast.hywtl_has.business.view.BusinessShortView;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import com.howoocast.hywtl_has.user.view.UserShortView;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.Getter;

@Getter
public class ProjectEstimateShortView {

    private Long id;
    private String code;
    private String type;
    private Boolean isSent;
    private Boolean isLh;
    private Boolean confirmed;
    private String recipient;
    private UserShortView createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private BusinessShortView business;

    public static ProjectEstimateShortView assemble(ProjectEstimate source) {
        ProjectEstimateShortView target = new ProjectEstimateShortView();
        target.id = source.getId();
        target.code = source.getCode();
        target.type = source.getType();
        target.isSent = source.getIsSent();
        target.isLh = source.getIsLh();
        target.confirmed = source.getConfirmed();
        target.recipient = source.getRecipient();
        target.createdBy = UserShortView.assemble(source.getWriter());
        target.createdAt = source.getCreatedAt();
        target.modifiedAt = Optional.ofNullable(source.getModifiedAt()).orElse(source.getCreatedAt());
        target.business = BusinessShortView.assemble(source.getBusiness());
        return target;
    }
}
