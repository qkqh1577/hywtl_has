package com.howoocast.hywtl_has.project.view;

import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.domain.ProjectBasicBidType;
import com.howoocast.hywtl_has.project.domain.ProjectBidStatus;
import com.howoocast.hywtl_has.project.domain.ProjectContractStatus;
import com.howoocast.hywtl_has.project.domain.ProjectEstimateExpectation;
import com.howoocast.hywtl_has.project.domain.ProjectEstimateStatus;
import com.howoocast.hywtl_has.project.domain.ProjectProgressStatus;
import com.howoocast.hywtl_has.user.view.UserShortView;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.Getter;

@Getter
public class ProjectView {

    private Long id;
    private String code;
    private String name;
    private String alias;
    private ProjectBasicBidType bidType;
    private UserShortView receptionManager;
    private UserShortView salesManager;
    private UserShortView projectManager;
    private LocalDate expectedMonth;
    private LocalDate requestedMonth;
    private Boolean isLh;
    private ProjectProgressStatus progressStatus;
    private ProjectEstimateExpectation estimateExpectation;
    private ProjectEstimateStatus estimateStatus;
    private ProjectContractStatus contractStatus;
    private ProjectBidStatus bidStatus;
    private LocalDateTime modifiedAt;

    public static ProjectView assemble(Project source) {
        ProjectView target = new ProjectView();
        target.id = source.getId();
        target.code = source.getBasic().getCode();
        target.name = source.getBasic().getName();
        target.alias = source.getBasic().getAlias();
        target.bidType = source.getBasic().getBidType();
        target.receptionManager = UserShortView.assemble(source.getBasic().getReceptionManager());
        Optional.ofNullable(source.getBasic().getSalesManager()).ifPresent((user) ->
            target.salesManager = UserShortView.assemble(user)
        );
        Optional.ofNullable(source.getBasic().getProjectManager()).ifPresent((user) ->
            target.projectManager = UserShortView.assemble(user)
        );
        target.expectedMonth = source.getBasic().getExpectedMonth();
        target.requestedMonth = source.getBasic().getRequestedMonth();
        target.isLh = source.getBasic().getIsLh();
        target.progressStatus = source.getStatus().getProgressStatus();
        target.estimateExpectation = source.getStatus().getEstimateExpectation();
        target.estimateStatus = source.getStatus().getEstimateStatus();
        target.contractStatus = source.getStatus().getContractStatus();
        target.bidStatus = source.getStatus().getBidStatus();
        target.modifiedAt = Optional.ofNullable(source.getModifiedAt()).orElse(source.getCreatedAt());

        return target;
    }
}
