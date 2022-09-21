package com.howoocast.hywtl_has.project_log.domain;

import com.howoocast.hywtl_has.project.domain.Project;
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
        return this.project.getId();
    }
}
