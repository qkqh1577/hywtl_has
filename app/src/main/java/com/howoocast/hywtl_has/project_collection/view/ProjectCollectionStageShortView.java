package com.howoocast.hywtl_has.project_collection.view;

import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStage;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStageStatus;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStageStatusType;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
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
            List<ProjectCollectionStageStatus> askedList = source.getStatusList().stream()
                .filter(status -> status.getType() == ProjectCollectionStageStatusType.ASKED)
                .collect(Collectors.toList());
            if (!askedList.isEmpty()) {
                Collections.reverse(askedList);
                Optional<Long> askedAmount = askedList.stream().map(ProjectCollectionStageStatus::getAmount)
                    .reduce(Long::sum);
                askedList.stream().findFirst().ifPresent(status -> {
                    target.askedDate = status.getRequestedDate();
                    target.askedAmount = askedAmount.orElse(0L);
                });
            }
            List<ProjectCollectionStageStatus> collectedList = source.getStatusList()
                .stream()
                .filter(status -> status.getType() == ProjectCollectionStageStatusType.COLLECTED)
                .collect(Collectors.toList());
            if (!collectedList.isEmpty()) {
                Collections.reverse(collectedList);
                Optional<Long> collectedAmount = collectedList.stream().map(ProjectCollectionStageStatus::getAmount)
                    .reduce(Long::sum);
                collectedList.stream().findFirst().ifPresent(status -> {
                    target.collectedDate = status.getRequestedDate();
                    target.collectedAmount = collectedAmount.orElse(0L);
                });
            }
            List<ProjectCollectionStageStatus> carryOverList = source.getStatusList().stream()
                .filter(status -> status.getType() == ProjectCollectionStageStatusType.CARRYOVER)
                .collect(Collectors.toList());
            if (!carryOverList.isEmpty()) {
                Collections.reverse(carryOverList);
                Optional<Long> carryOverAmount = carryOverList.stream().map(ProjectCollectionStageStatus::getAmount)
                    .reduce(Long::sum);
                carryOverList.stream().findFirst().ifPresent(status -> {
                    target.carryoverDate = status.getRequestedDate();
                    target.carryoverAmount = carryOverAmount.orElse(0L);
                });
            }
        }

        if (Objects.nonNull(target.collectedAmount) && Objects.nonNull(target.amount) && target.amount > 0) {
            target.collectedRate = 1.0 * target.collectedAmount / target.amount * 100;
        }
        return target;
    }
}
