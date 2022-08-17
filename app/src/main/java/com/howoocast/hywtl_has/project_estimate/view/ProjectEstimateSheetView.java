package com.howoocast.hywtl_has.project_estimate.view;

import com.howoocast.hywtl_has.project_estimate.common.ProjectEstimateSheetStatus;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateSheet;
import com.howoocast.hywtl_has.project_review.view.ProjectReviewView;
import com.howoocast.hywtl_has.user.view.UserShortView;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class ProjectEstimateSheetView {

    private Long id;

    private Boolean confirmed;

    private ProjectEstimateSheetStatus status;

    private String title;

    private String note;

    private LocalDate estimateDate;

    private LocalDate expectedStartMonth;

    private UserShortView salesTeamLeader;

    private UserShortView salesManagerLeader;

    private Integer engineeringPeriod;

    private Integer finalReportPeriod;

    private ProjectReviewView review;

    private List<ProjectEstimateSheetTestServiceView> testServiceList;

    private Long specialDiscount;

    private List<ProjectEstimateSheetCommentView> commentList;

    public static ProjectEstimateSheetView assemble(ProjectEstimateSheet source) {
        ProjectEstimateSheetView target = new ProjectEstimateSheetView();
        target.id = source.getId();
        target.confirmed = source.getConfirmed();
        target.status = source.getStatus();
        target.title = source.getTitle();
        target.note = source.getNote();
        target.estimateDate = source.getEstimateDate();
        target.expectedStartMonth = source.getExpectedStartMonth();
        target.salesTeamLeader = UserShortView.assemble(source.getSalesTeamLeader());
        target.salesManagerLeader = Optional.ofNullable(source.getSalesManagementLeader())
            .map(UserShortView::assemble).orElse(null);
        target.engineeringPeriod = source.getEngineeringPeriod();
        target.finalReportPeriod = source.getFinalReportPeriod();
        target.review = ProjectReviewView.assemble(source.getReview());
        target.testServiceList = source.getTestServiceList().stream()
            .map(ProjectEstimateSheetTestServiceView::assemble)
            .collect(Collectors.toList());
        target.specialDiscount = source.getSpecialDiscount();
        target.commentList = source.getCommentList().stream()
            .map(ProjectEstimateSheetCommentView::assemble)
            .collect(Collectors.toList());
        return target;
    }


}
