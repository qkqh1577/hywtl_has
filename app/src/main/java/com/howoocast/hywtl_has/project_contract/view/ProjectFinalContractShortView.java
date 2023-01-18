package com.howoocast.hywtl_has.project_contract.view;

import com.howoocast.hywtl_has.business.view.BusinessShortView;
import com.howoocast.hywtl_has.project_contract.domain.ProjectFinalContract;
import com.howoocast.hywtl_has.user.view.UserShortView;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.Getter;

@Getter
public class ProjectFinalContractShortView {

    private Long id;
    private LocalDate contractDate;
    private String contractType;
    private String code;
    private String estimateCode;
    private Boolean isSent;
    private String note;
    private String targetTest;
    private Long testAmount;
    private Long reviewAmount;
    private Long totalAmount;
    private String schedule;
    private BusinessShortView business;
    private UserShortView createdBy;
    private LocalDateTime modifiedAt;


    public static ProjectFinalContractShortView assemble(ProjectFinalContract source) {
        ProjectFinalContractShortView target = new ProjectFinalContractShortView();
        target.id = source.getId();
        target.contractDate = source.getContractDate();
        target.contractType = source.getContractType();
        target.code = source.getCode();
        target.estimateCode = source.getEstimateCode();
        target.isSent = source.getIsSent();
        target.note = source.getNote();
        target.targetTest = source.getTargetTest();
        target.testAmount = source.getTestAmount();
        target.reviewAmount = source.getReviewAmount();
        target.totalAmount = source.getTotalAmount();
        target.schedule = source.getSchedule();
        target.business = Optional.ofNullable(source.getBusiness()).map(BusinessShortView::assemble).orElse(null);
        target.createdBy = Optional.ofNullable(source.getWriter()).map(UserShortView::assemble).orElse(null);
        target.modifiedAt = Optional.ofNullable(source.getModifiedAt()).orElse(source.getCreatedAt());
        return target;
    }
}
