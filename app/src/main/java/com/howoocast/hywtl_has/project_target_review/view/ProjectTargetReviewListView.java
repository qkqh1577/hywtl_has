package com.howoocast.hywtl_has.project_target_review.view;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.howoocast.hywtl_has.project_target_review.common.ProjectTargetReviewStatus;
import com.howoocast.hywtl_has.project_target_review.domain.ProjectTargetReview;
import com.howoocast.hywtl_has.user.view.UserListView;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ProjectTargetReviewListView {

    private Long id;

    @JsonIgnore
    private Long projectId;

    private ProjectTargetReviewStatus status;

    private Boolean confirmed;

    private String title;

    private UserListView writer;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    public static ProjectTargetReviewListView assemble(ProjectTargetReview source) {
        ProjectTargetReviewListView target = new ProjectTargetReviewListView();
        target.id = source.getId();
        target.projectId = source.getProjectId();
        target.status = source.getStatus();
        target.confirmed = source.getConfirmed();
        target.title = source.getTitle();
        target.writer = UserListView.assemble(source.getWriter());
        target.createdAt = source.getCreatedAt();
        target.modifiedAt = source.getModifiedAt();
        return target;
    }
}
