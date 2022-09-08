package com.howoocast.hywtl_has.project_document.parameter;

import com.howoocast.hywtl_has.file.parameter.FileItemParameter;
import com.howoocast.hywtl_has.project_document.domain.ProjectDocument;
import com.howoocast.hywtl_has.project_document.domain.ProjectDocumentType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectDocumentAddParameter {

    @NotNull(message = ProjectDocument.KEY + ".type.not_null")
    private ProjectDocumentType type;

    @NotBlank(message = ProjectDocument.KEY + ".recipient.not_blank")
    private String recipient;

    @NotNull(message = ProjectDocument.KEY + ".file.not_null")
    private FileItemParameter file;

    private FileItemParameter mailFile;

    private String note;

}
