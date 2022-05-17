package com.howoocast.hywtl_has.project_estimate.parameter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectEstimateSheetCommentParameter {

    @NotNull(message = "project.estimate.sheet.comment.seq.not-null")
    private Integer seq;

    @NotBlank(message = "project.estimate.sheet.comment.description.not-blank")
    private String description;

    @NotNull(message = "project.estimate.sheet.comment.in-use.not-null")
    private Boolean inUse;
}
