package com.howoocast.hywtl_has.project_log.view;

import com.howoocast.hywtl_has.project_log.domain.ProjectLog;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ProjectLogView {

    private LocalDateTime createdAt;
    private String tabName;
    private String sectionName;
    private String itemName;
    private String before;
    private String after;

    public static ProjectLogView assemble(ProjectLog source) {
        ProjectLogView target = new ProjectLogView();
        target.createdAt = source.getCreatedAt();
        target.tabName = source.getTabName();
        target.sectionName = source.getSectionName();
        target.itemName = source.getItemName();
        target.before = source.getBefore();
        target.after = source.getAfter();

        return target;
    }
}
