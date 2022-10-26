package com.howoocast.hywtl_has.project_collection.view;

import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStage;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStageStatusType;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;
import lombok.Getter;

@Getter
public class ProjectCollectionStageShortView {

    private Long id;
    private String name;
    private Long amount;
    private LocalDate expectedDate;
    private LocalDate askedDate;
    private Long askedAmount;
    private LocalDate collectedDate;
    private Long collectedAmount;
    private Double collectedRate;

    private LocalDate carryoverDate;
    private Long carryoverAmount;
    private LocalDateTime modifiedAt;

    public static ProjectCollectionStageShortView assemble(ProjectCollectionStage source) {
        ProjectCollectionStageShortView target = new ProjectCollectionStageShortView();
        target.id = source.getId();
        target.name = source.getName();
        target.amount = source.getAmount();
        target.expectedDate = source.getExpectedDate();
        target.modifiedAt = Optional.ofNullable(source.getModifiedAt()).orElse(source.getCreatedAt());
        if (Objects.nonNull(source.getStatusList())) {
            source.getStatusList().stream()
                .filter(status -> status.getType() == ProjectCollectionStageStatusType.ASKED)
                .findFirst()
                .ifPresent((status) -> {
                    target.askedDate = status.getRequestedDate();
                    target.askedAmount = source.getAmount();
                });
            source.getStatusList().stream()
                .filter(status -> status.getType() == ProjectCollectionStageStatusType.COLLECTED)
                .findFirst()
                .ifPresent((status) -> {
                    target.collectedDate = status.getRequestedDate();
                    target.collectedAmount = source.getAmount();
                });
            source.getStatusList().stream()
                .filter(status -> status.getType() == ProjectCollectionStageStatusType.CARRYOVER)
                .findFirst()
                .ifPresent((status) -> {
                    target.carryoverDate = status.getRequestedDate();
                    target.carryoverAmount = source.getAmount();
                });
        }
        if (Objects.nonNull(target.collectedAmount) && Objects.nonNull(target.amount) && target.amount > 0) {
            target.collectedRate = 1.0 * target.collectedAmount / target.amount * 100;
        }
        return target;
    }
}
