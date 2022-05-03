package com.howoocast.hywtl_has.project.parameter;

import com.howoocast.hywtl_has.common.parameter.FileItemParameter;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectTargetDocumentAddParameter {

    @NotNull(message = "project.target.document.file-item.not-null")
    private FileItemParameter fileItem;

    private String memo;

}
