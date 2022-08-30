package com.howoocast.hywtl_has.project.document.parameter;

import com.howoocast.hywtl_has.project.document.domain.ProjectDocument;
import com.howoocast.hywtl_has.project.document.domain.ProjectDocumentType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class ProjectDocumentAddParameter {

    @NotNull(message = ProjectDocument.KEY + ".type.not_null")
    private ProjectDocumentType type;

    @NotBlank(message = ProjectDocument.KEY + ".recipient.not_blank")
    private String recipient;

    @NotNull(message = ProjectDocument.KEY + ".file.not_null")
    private MultipartFile file;

    private MultipartFile mailFile;

    private String note;

}
