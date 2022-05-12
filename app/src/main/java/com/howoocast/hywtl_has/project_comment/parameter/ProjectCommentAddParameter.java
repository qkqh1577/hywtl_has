package com.howoocast.hywtl_has.project_comment.parameter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectCommentAddParameter {

    @NotNull(message = "project-comment.project-id.not-null")
    private Long projectId;

    @NotBlank(message = "project-comment.description.not-blank")
    private String description;

}
