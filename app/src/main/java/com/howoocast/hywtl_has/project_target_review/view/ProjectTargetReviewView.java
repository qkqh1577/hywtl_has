package com.howoocast.hywtl_has.project_target_review.view;

import com.howoocast.hywtl_has.project_target_review.common.ProjectTargetReviewStatus;
import com.howoocast.hywtl_has.project_target_review.domain.ProjectTargetReview;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class ProjectTargetReviewView {

    private Long id;

    private ProjectTargetReviewStatus status;

    private Boolean confirmed;

    private String title;

    private String memo;

    private List<ProjectTargetReviewDetailView> detailList;

    public static ProjectTargetReviewView assemble(ProjectTargetReview source) {
        ProjectTargetReviewView target = new ProjectTargetReviewView();
        target.id = source.getId();
        target.status = source.getStatus();
        target.confirmed = source.getConfirmed();
        target.title = source.getTitle();
        target.memo = source.getMemo();
        target.detailList = source.getDetailList().stream()
            .map(ProjectTargetReviewDetailView::assemble)
            .collect(Collectors.toList());
        return target;
    }

}
