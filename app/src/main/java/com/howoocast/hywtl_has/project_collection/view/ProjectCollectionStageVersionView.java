package com.howoocast.hywtl_has.project_collection.view;

import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStageVersion;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.Getter;

@Getter
public class ProjectCollectionStageVersionView {

    private String name;
    private Long amount;
    private String note;
    private LocalDate expectedDate;
    private String reason;

    private LocalDateTime modifiedAt;

    public static ProjectCollectionStageVersionView assemble(ProjectCollectionStageVersion source) {
        ProjectCollectionStageVersionView target = new ProjectCollectionStageVersionView();
        target.name = source.getName();
        target.amount = source.getAmount();
        target.note = source.getNote();
        target.expectedDate = source.getExpectedDate();
        target.reason = source.getReason();
        target.modifiedAt = Optional.ofNullable(source.getModifiedAt()).orElse(source.getCreatedAt());
        return target;
    }
}
