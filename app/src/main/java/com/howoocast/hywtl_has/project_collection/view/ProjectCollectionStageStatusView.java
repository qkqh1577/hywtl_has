package com.howoocast.hywtl_has.project_collection.view;

import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStageStatus;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStageStatusType;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.Getter;

@Getter
public class ProjectCollectionStageStatusView {

    private ProjectCollectionStageStatusType type;

    private LocalDate requestedDate;
    private Long amount;
    private String note;

    private LocalDateTime modifiedAt;

    public static ProjectCollectionStageStatusView assemble(ProjectCollectionStageStatus source) {
        ProjectCollectionStageStatusView target = new ProjectCollectionStageStatusView();
        target.type = source.getType();
        target.requestedDate = source.getRequestedDate();
        target.amount = source.getAmount();
        target.note = source.getNote();
        target.modifiedAt = Optional.ofNullable(source.getModifiedAt()).orElse(source.getCreatedAt());
        return target;
    }
}
