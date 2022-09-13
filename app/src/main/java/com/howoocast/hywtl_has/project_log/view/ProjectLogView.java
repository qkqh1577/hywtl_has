package com.howoocast.hywtl_has.project_log.view;

import com.howoocast.hywtl_has.project_log.domain.ProjectLog;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ProjectLogView {

    private LocalDateTime date;
    private String tabName;
    private String sectionName;
    private String itemName;
    private String before;
    private String after;
    private String username;
    private String name;

    public static ProjectLogView assemble(ProjectLog source) {
        ProjectLogView target = new ProjectLogView();
        target.date = source.getDate();
        target.sectionName = source.getSectionName();
        target.itemName = source.getItemName();
        target.before = source.getBefore();
        target.after = source.getAfter();
        target.username = source.getUsername();
        target.name = source.getName();

        return target;
    }
}
