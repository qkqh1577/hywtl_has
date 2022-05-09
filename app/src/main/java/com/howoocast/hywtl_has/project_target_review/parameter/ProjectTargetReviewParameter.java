package com.howoocast.hywtl_has.project_target_review.parameter;

import com.howoocast.hywtl_has.project_target_review.common.ProjectTargetReviewStatus;
import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectTargetReviewParameter {

    @NotNull(message = "project.target.review.confirmed.not-null")
    private Boolean confirmed;

    @NotNull(message = "project.target.review.status.not-null")
    private ProjectTargetReviewStatus status;

    @NotBlank(message = "project.target.review.title.not-blank")
    private String title;

    private String memo;

    @NotEmpty(message = "project.target.review.detail-list.not-empty")
    private List<ProjectTargetReviewDetailParameter> detailList;

}
