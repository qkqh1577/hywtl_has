package com.howoocast.hywtl_has.project_comment.view;

import com.howoocast.hywtl_has.project_comment.domain.ProjectComment;
import com.howoocast.hywtl_has.user.view.UserListView;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ProjectCommentView {

    private Long id;
    private Long projectId;
    private UserListView writer;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public static ProjectCommentView assemble(ProjectComment source) {
        ProjectCommentView target = new ProjectCommentView();
        target.id = source.getId();
        target.projectId = source.getProject().getId();
        target.writer = UserListView.assemble(source.getWriter());
        target.description = source.getDescription();
        target.createdAt = source.getCreatedAt();
        target.modifiedAt = source.getModifiedAt();
        return target;
    }
}
