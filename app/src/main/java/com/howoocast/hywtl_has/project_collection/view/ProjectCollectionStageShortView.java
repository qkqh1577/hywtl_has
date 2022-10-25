package com.howoocast.hywtl_has.project_collection.view;

import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStage;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.Getter;

@Getter
public class ProjectCollectionStageShortView {

    private Long id;
    private String name;
    private Double rate;
    private Long amount;
    private LocalDate expectedDate;
    private LocalDate askedDate;
    private LocalDate collectedDate;
    private Long collectedAmount;
    private Double collectedRate;
    private LocalDateTime modifiedAt;

    public static ProjectCollectionStageShortView assemble(ProjectCollectionStage source) {
        ProjectCollectionStageShortView target = new ProjectCollectionStageShortView();
        target.id = source.getId();
        target.name = source.getName();
        target.rate = source.getRate();
        target.amount = source.getAmount();
        target.expectedDate = source.getExpectedDate();
        target.askedDate = source.getAskedDate();
        target.collectedDate = source.getCollectedDate();
        target.collectedAmount = source.getCollectedAmount();
        target.collectedRate = source.getCollectedRate();
        target.modifiedAt = Optional.ofNullable(source.getModifiedAt()).orElse(source.getCreatedAt());
        return target;
    }
}
