package com.howoocast.hywtl_has.project_collection.view;

import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStage;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class ProjectCollectionStageView {

    private Long id;
    private String name;
    private Long amount;
    private String note;
    private LocalDate expectedDate;
    private LocalDateTime modifiedAt;
    private List<ProjectCollectionStageStatusView> statusList;
    private List<ProjectCollectionStageVersionView> versionList;

    public static ProjectCollectionStageView assemble(ProjectCollectionStage source) {
        ProjectCollectionStageView target = new ProjectCollectionStageView();
        target.id = source.getId();
        target.name = source.getName();
        target.amount = source.getAmount();
        target.note = source.getNote();
        target.expectedDate = source.getExpectedDate();
        target.modifiedAt = Optional.ofNullable(source.getModifiedAt()).orElse(source.getCreatedAt());
        if (Objects.nonNull(source.getStatusList())) {
            target.statusList = source.getStatusList().stream()
                .map(ProjectCollectionStageStatusView::assemble)
                .collect(Collectors.toList());
        } else {
            target.statusList = Collections.emptyList();
        }
        if (Objects.nonNull(source.getVersionList())) {
            target.versionList = source.getVersionList().stream()
                .map(ProjectCollectionStageVersionView::assemble)
                .collect(Collectors.toList());
        } else {
            target.versionList = Collections.emptyList();
        }

        return target;
    }
}
