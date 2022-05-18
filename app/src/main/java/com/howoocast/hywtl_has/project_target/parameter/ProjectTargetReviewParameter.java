package com.howoocast.hywtl_has.project_target.parameter;

import com.howoocast.hywtl_has.file.parameter.FileItemParameter;
import com.howoocast.hywtl_has.project_target.common.ProjectTargetReviewStatus;
import java.util.List;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectTargetReviewParameter {

    @NotNull(message = "project-target-review.status.not-null")
    private ProjectTargetReviewStatus status;

    @NotBlank(message = "project-target-review.code.not-blank")
    private String code;

    @Min(value = 0, message = "project-target.land-figure-count.positive")
    private Integer landFigureCount;

    private List<String> testList;

    @NotEmpty(message = "project-target-review.detail-list.not-empty")
    private List<ProjectTargetReviewDetailParameter> detailList;

    private List<FileItemParameter> fileList;
}
