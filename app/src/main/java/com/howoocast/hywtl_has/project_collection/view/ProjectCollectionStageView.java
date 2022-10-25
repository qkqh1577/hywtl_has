package com.howoocast.hywtl_has.project_collection.view;

import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStage;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.Getter;

@Getter
public class ProjectCollectionStageView {

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
    private String note;
    private String reason;

    public static ProjectCollectionStageView assemble(ProjectCollectionStage source) {
        ProjectCollectionStageView target = new ProjectCollectionStageView();
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
        target.note = source.getNote();
        target.reason = source.getReason();
        return target;
    }
}
