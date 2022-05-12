package com.howoocast.hywtl_has.project.view;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.howoocast.hywtl_has.file.view.FileItemView;
import com.howoocast.hywtl_has.project.domain.ProjectTargetDocument;
import com.howoocast.hywtl_has.user.view.UserListView;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ProjectTargetDocumentView {

    private Long id;

    @JsonIgnore
    private Long projectId;

    private FileItemView fileItem;

    private UserListView writer;

    private String memo;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    public static ProjectTargetDocumentView assemble(ProjectTargetDocument source) {
        ProjectTargetDocumentView target = new ProjectTargetDocumentView();
        target.id = source.getId();
        target.projectId = source.getProjectId();
        target.fileItem = FileItemView.assemble(source.getFileItem());
        target.writer = UserListView.assemble(source.getWriter());
        target.memo = source.getMemo();
        target.createdAt = source.getCreatedAt();
        target.modifiedAt = source.getModifiedAt();
        return target;
    }
}
