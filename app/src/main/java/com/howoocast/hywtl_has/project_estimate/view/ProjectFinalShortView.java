package com.howoocast.hywtl_has.project_estimate.view;

import com.howoocast.hywtl_has.business.view.BusinessShortView;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectFinalEstimate;
import com.howoocast.hywtl_has.user.view.UserShortView;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.Getter;

@Getter
public class ProjectFinalShortView {
    private Long id;
    private String code;
    private String type;
    private Boolean isSent;
    private UserShortView createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private BusinessShortView business;
    private LocalDate estimateDate;
    private String targetTest;
    private String note;
    private Long testAmount;
    private Long reviewAmount;
    private Long totalAmount;
    private String schedule;
    private LocalDate sentDate;

    public static ProjectFinalShortView assemble(ProjectFinalEstimate source) {
        ProjectFinalShortView target = new ProjectFinalShortView();
        target.id = source.getId();
        target.code = source.getCode();
        target.type = source.getType();
        target.isSent = source.getIsSent();
        target.createdBy = Optional.ofNullable(source.getWriter()).map(UserShortView::assemble).orElse(null);
        target.createdAt = source.getCreatedAt();
        target.modifiedAt = Optional.ofNullable(source.getModifiedAt()).orElse(source.getCreatedAt());
        target.business = Optional.ofNullable(source.getBusiness()).map(BusinessShortView::assemble).orElse(null);
        target.estimateDate = source.getEstimateDate();
        target.targetTest = source.getTargetTest();
        target.note = source.getNote();
        target.testAmount = source.getTestAmount();
        target.reviewAmount = source.getReviewAmount();
        target.totalAmount = source.getTotalAmount();
        target.schedule = source.getSchedule();
        target.sentDate = source.getSentDate();
        return target;
    }
}
