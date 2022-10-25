package com.howoocast.hywtl_has.project_collection.parameter;

import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStage;
import java.time.LocalDate;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectCollectionAddStageParameter {

    @NotBlank(message = ProjectCollectionStage.KEY + ".name.not_blank")
    private String name;

    @NotNull(message = ProjectCollectionStage.KEY + ".amount.not_null")
    private Long amount;

    @NotNull(message = ProjectCollectionStage.KEY + ".rate.not_null")
    private Double rate;

    private String note;

    @NotNull(message = ProjectCollectionStage.KEY + ".expected_date.not_null")
    private LocalDate expectedDate;
}
