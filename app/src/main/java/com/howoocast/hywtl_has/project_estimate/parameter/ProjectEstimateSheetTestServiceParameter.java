package com.howoocast.hywtl_has.project_estimate.parameter;

import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectEstimateSheetTestServiceParameter {

    @NotBlank(message = "project.estimate.sheet.test-service.title.not-blank")
    private String title;

    @NotEmpty(message = "project.estimate.sheet.test-service.detail-list.not-empty")
    private List<ProjectEstimateSheetTestServiceDetailParameter> detailList;

    @NotNull(message = "project.estimate.sheet.test-service.seq.not-null")
    private Integer seq;
}
