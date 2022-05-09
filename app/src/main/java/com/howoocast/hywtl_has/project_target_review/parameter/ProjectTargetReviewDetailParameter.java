package com.howoocast.hywtl_has.project_target_review.parameter;

import java.util.List;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectTargetReviewDetailParameter {

    @NotBlank(message = "project.target.review.detail.building-name.not-blank")
    private String buildingName;

    @NotNull(message = "project.target.review.detail.floor-count.not-null")
    private Integer floorCount;

    private Integer baseCount;

    @NotNull(message = "project.target.review.detail.height.not-null")
    @DecimalMin(value = "0.0", message = "project.target.review.detail.height.positive")
    private Double height;

    @NotNull(message = "project.target.review.detail.area.not-null")
    @DecimalMin(value = "0.0", message = "project.target.review.detail.area.positive")
    private Double area;

    private List<String> specialWindLoadConditionList;

    @NotEmpty(message = "project.target.review.detail.test-list.not-empty")
    private List<String> testList;

    private String memo1;

    private String memo2;
}
