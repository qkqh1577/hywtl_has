package com.howoocast.hywtl_has.project.parameter;

import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectTargetReviewAddParameter {

    @NotBlank(message = "project.target.review.title.not-blank")
    private String title;

    private String memo;

}
