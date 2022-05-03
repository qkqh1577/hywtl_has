package com.howoocast.hywtl_has.project.view;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.howoocast.hywtl_has.project.common.ProjectTargetReviewStatus;
import com.howoocast.hywtl_has.project.domain.ProjectTargetReview;
import com.howoocast.hywtl_has.user.view.UserListView;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ProjectTargetReviewView {

    private Long id;

    @JsonIgnore
    private Long projectId;

    private ProjectTargetReviewStatus status;

    private Boolean confirmed;

    private String title;

    private UserListView writer;

    private LocalDateTime createdTime;

    private LocalDateTime updatedTime;

    public static ProjectTargetReviewView assemble(ProjectTargetReview source) {
        ProjectTargetReviewView target = new ProjectTargetReviewView();
        target.id = source.getId();
        target.projectId = source.getProjectId();
        target.status = source.getStatus();
        target.confirmed = source.getConfirmed();
        target.title = source.getTitle();
        target.writer = UserListView.assemble(source.getWriter());
        target.createdTime = source.getCreatedTime();
        target.updatedTime = source.getUpdatedTime();
        return target;
    }
}
