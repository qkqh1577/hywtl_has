package com.howoocast.hywtl_has.project_collection.parameter;

import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStageStatus;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStageStatusType;
import java.time.LocalDate;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectCollectionStageStatusParameter {

    @NotNull(message = ProjectCollectionStageStatus.KEY + ".type.not_null")
    private ProjectCollectionStageStatusType type;

    @NotNull(message = ProjectCollectionStageStatus.KEY + ".requested_date.not_null")
    private LocalDate requestedDate;

    private Long amount;

    private String note;
}
