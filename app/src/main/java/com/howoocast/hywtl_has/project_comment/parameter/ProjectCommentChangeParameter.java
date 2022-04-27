package com.howoocast.hywtl_has.project_comment.parameter;

import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectCommentChangeParameter {

    @NotBlank(message = "project-comment.description.not-blank")
    private String description;
}
