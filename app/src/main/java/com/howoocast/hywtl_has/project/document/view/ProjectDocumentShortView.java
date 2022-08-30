package com.howoocast.hywtl_has.project.document.view;

import com.howoocast.hywtl_has.file.view.FileItemView;
import com.howoocast.hywtl_has.project.document.domain.ProjectDocument;
import com.howoocast.hywtl_has.project.document.domain.ProjectDocumentType;
import com.howoocast.hywtl_has.user.view.UserShortView;
import java.time.LocalDateTime;
import java.util.Objects;
import lombok.Getter;

@Getter
public class ProjectDocumentShortView {

    private Long id;
    private String code;
    private ProjectDocumentType type;
    private LocalDateTime createdAt;
    private UserShortView createdBy;
    private String recipient;
    private FileItemView file;
    private LocalDateTime modifiedAt;
    private String note;
    private Long mailFileId;

    public static ProjectDocumentShortView assemble(ProjectDocument source) {
        ProjectDocumentShortView target = new ProjectDocumentShortView();
        target.id = source.getId();
        target.code = source.getCode();
        target.type = source.getType();
        target.createdAt = source.getCreatedAt();
        target.createdBy = UserShortView.assemble(source.getWriter());
        target.recipient = source.getRecipient();
        target.file = FileItemView.assemble(source.getFile());
        if (Objects.nonNull(source.getMailFile())) {
            target.mailFileId = source.getMailFile().getId();
        }
        target.modifiedAt = source.getModifiedAt();
        target.note = source.getNote();
        return target;
    }
}
