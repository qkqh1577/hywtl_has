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
    private LocalDate requestedDate;
    private LocalDate delayedDate;
    private LocalDate expectedDate;
    private Long amount;
    private String note;
}
