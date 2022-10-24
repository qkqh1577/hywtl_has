package com.howoocast.hywtl_has.project_log.domain;

import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import java.util.Objects;
import javax.annotation.Nullable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;

@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectLogEvent {

    private final Project project;

    private final String itemName;
    private final String before;
    private final String after;

    public static ProjectLogEvent of(
        Project project,
        String itemName,
        @Nullable String before,
        @Nullable String after
    ) {
        return new ProjectLogEvent(
            project,
            itemName,
            before,
            after
        );
    }

    public static ProjectLogEvent of(
        Project project,
        EventEntity event
    ) {
        return new ProjectLogEvent(
            project,
            event.getItemName(),
            event.getBefore(),
            event.getAfter()
        );
    }

    public static ProjectLogEvent of(
        Project project,
        String itemName
    ) {
        return new ProjectLogEvent(
            project,
            itemName,
            null,
            null
        );
    }

    public ProjectLog build(
        Long userId,
        String tabName,
        String sectionName
    ) {
        return ProjectLog.of(
            this.project,
            tabName,
            sectionName,
            this.itemName,
            this.before,
            this.after,
            userId
        );
    }

    public Long getProjectId() {
        return Objects.requireNonNull(this.project.getId());
    }
}
