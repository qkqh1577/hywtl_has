package com.howoocast.hywtl_has.project_review.parameter;

import com.howoocast.hywtl_has.file.parameter.FileItemParameter;
import com.howoocast.hywtl_has.project_review.common.ProjectReviewStatus;
import java.util.List;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectReviewParameter {

    @NotNull(message = "project-review.status.not-null")
    private ProjectReviewStatus status;

    @NotBlank(message = "project-review.code.not-blank")
    private String code;

    @Min(value = 0, message = "project.land-figure-count.positive")
    private Integer landFigureCount;

    private List<String> testList;

    @NotEmpty(message = "project-review.detail-list.not-empty")
    private List<ProjectReviewDetailParameter> detailList;

    private List<FileItemParameter> fileList;
}
