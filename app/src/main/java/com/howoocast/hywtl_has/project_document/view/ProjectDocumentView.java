package com.howoocast.hywtl_has.project_document.view;

import com.howoocast.hywtl_has.file.view.FileItemView;
import com.howoocast.hywtl_has.project_document.domain.ProjectDocument;
import com.howoocast.hywtl_has.project_document.domain.ProjectDocumentType;
import com.howoocast.hywtl_has.user.view.UserShortView;
import java.util.Objects;
import lombok.Getter;

@Getter
public class ProjectDocumentView {

    private Long id;
    private String code;
    private ProjectDocumentType type;
    private UserShortView createdBy;
    private String recipient;
    private FileItemView file;
    private FileItemView mailFile;
    private String note;

    public static ProjectDocumentView assemble(ProjectDocument source) {
        ProjectDocumentView target = new ProjectDocumentView();
        target.id = source.getId();
        target.code = source.getCode();
        target.type = source.getType();
        target.createdBy = UserShortView.assemble(source.getWriter());
        target.recipient = source.getRecipient();
        target.file = FileItemView.assemble(source.getFile());
        if (Objects.nonNull(source.getMailFile())) {
            target.mailFile = FileItemView.assemble(source.getMailFile());
        }
        target.note = source.getNote();
        return target;
    }

}
