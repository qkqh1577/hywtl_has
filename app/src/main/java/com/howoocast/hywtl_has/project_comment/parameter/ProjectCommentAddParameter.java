package com.howoocast.hywtl_has.project_comment.parameter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectCommentAddParameter {

    @NotNull(message = "project_comment.project_id.not_null")
    private Long projectId;

    @NotBlank(message = "project_comment.description.not_blank")
    private String description;

}
