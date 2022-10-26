package com.howoocast.hywtl_has.project_collection.parameter;

import com.howoocast.hywtl_has.project_collection.domain.ProjectCollection;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStage;
import java.time.LocalDate;
import java.util.List;
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

    @NotNull(message = ProjectCollectionStage.KEY + ".expected_date.not_null")
    private LocalDate expectedDate;

    private String note;

    private String reason;

    private Boolean dirty;

    private List<ProjectCollectionStageStatusParameter> statusList;
}
