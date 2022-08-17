package com.howoocast.hywtl_has.project_review.parameter;

import java.util.List;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectReviewDetailParameter {

    private Long id;

    @NotBlank(message = "project_review.detail.building_name.not_blank")
    private String buildingName;

    @NotNull(message = "project_review.detail.floor_count.not_null")
    private Integer floorCount;

    private Integer baseCount;

    @NotNull(message = "project_review.detail.height.not_null")
    @DecimalMin(value = "0.0", message = "project_review.detail.height.positive")
    private Double height;

    @NotNull(message = "project_review.detail.area.not_null")
    @DecimalMin(value = "0.0", message = "project_review.detail.area.positive")
    private Double area;

    private List<String> specialWindLoadConditionList;

    @NotEmpty(message = "project_review.detail.test_list.not_empty")
    private List<String> testList;

    private String note1;

    private String note2;
}
