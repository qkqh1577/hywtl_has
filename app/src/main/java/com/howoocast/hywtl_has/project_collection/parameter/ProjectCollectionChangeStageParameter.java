package com.howoocast.hywtl_has.project_collection.parameter;

import com.howoocast.hywtl_has.project_collection.domain.ProjectCollection;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStage;
import java.time.LocalDate;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectCollectionChangeStageParameter {

    @NotBlank(message = ProjectCollection.KEY + ".name.not_blank")
    private String name;

    @NotNull(message = ProjectCollection.KEY + ".amount.not_null")
    private Long amount;

    @NotNull(message = ProjectCollection.KEY + ".rate.not_null")
    private Double rate;

    @NotNull(message = ProjectCollectionStage.KEY + ".expected_date.not_null")
    private LocalDate expectedDate;

    private String note;

    @NotBlank(message = ProjectCollection.KEY + ".reason.not_blank")
    private String reason;
}
