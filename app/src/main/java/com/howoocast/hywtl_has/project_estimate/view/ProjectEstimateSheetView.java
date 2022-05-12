package com.howoocast.hywtl_has.project_estimate.view;

import com.howoocast.hywtl_has.project_estimate.common.ProjectEstimateSheetStatus;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateSheet;
import com.howoocast.hywtl_has.project_target_review.view.ProjectTargetReviewView;
import com.howoocast.hywtl_has.user.view.UserListView;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class ProjectEstimateSheetView {

    private Long id;

    private Boolean confirmed;

    private ProjectEstimateSheetStatus status;

    private String title;

    private String memo;

    private LocalDate estimateDate;

    private LocalDate expectedStartMonth;

    private UserListView salesTeamLeader;

    private UserListView salesManagerLeader;

    private ProjectTargetReviewView review;

    private List<ProjectEstimateSheetDetailView> detailList;

    private Long specialDiscount;

    private List<ProjectEstimateSheetCommentView> commentList;

    public static ProjectEstimateSheetView assemble(ProjectEstimateSheet source) {
        ProjectEstimateSheetView target = new ProjectEstimateSheetView();
        target.id = source.getId();
        target.confirmed = source.getConfirmed();
        target.status = source.getStatus();
        target.title = source.getTitle();
        target.memo = source.getMemo();
        target.estimateDate = source.getEstimateDate();
        target.expectedStartMonth = source.getExpectedStartMonth();
        target.salesTeamLeader = UserListView.assemble(source.getSalesTeamLeader());
        target.salesManagerLeader = UserListView.assemble(source.getSalesManagementLeader());
        target.review = ProjectTargetReviewView.assemble(source.getReview());
        target.detailList = source.getDetailList().stream()
            .map(ProjectEstimateSheetDetailView::assemble)
            .collect(Collectors.toList());
        target.specialDiscount = source.getSpecialDiscount();
        target.commentList = source.getCommentList().stream()
            .map(ProjectEstimateSheetCommentView::assemble)
            .collect(Collectors.toList());
        return target;
    }


}
