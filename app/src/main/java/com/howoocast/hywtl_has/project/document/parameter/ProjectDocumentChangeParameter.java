package com.howoocast.hywtl_has.project.document.parameter;

import com.howoocast.hywtl_has.file.parameter.FileItemParameter;
import com.howoocast.hywtl_has.project.document.domain.ProjectDocument;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class ProjectDocumentChangeParameter {

    @NotBlank(message = ProjectDocument.KEY + ".recipient.not_blank")
    private String recipient;

    private MultipartFile mailFile;

    private String note;

}
