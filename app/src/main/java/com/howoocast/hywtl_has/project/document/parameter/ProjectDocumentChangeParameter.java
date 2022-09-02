package com.howoocast.hywtl_has.project.document.parameter;

import com.howoocast.hywtl_has.file.parameter.FileItemParameter;
import com.howoocast.hywtl_has.project.document.domain.ProjectDocument;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectDocumentChangeParameter {

    @NotBlank(message = ProjectDocument.KEY + ".recipient.not_blank")
    private String recipient;

    private FileItemParameter mailFile;

    private String note;

}
