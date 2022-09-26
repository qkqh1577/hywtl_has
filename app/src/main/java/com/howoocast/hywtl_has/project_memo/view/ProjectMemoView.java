package com.howoocast.hywtl_has.project_memo.view;

import com.howoocast.hywtl_has.project_memo.domain.ProjectMemo;
import com.howoocast.hywtl_has.project_memo.domain.ProjectMemoCategory;
import com.howoocast.hywtl_has.user.view.UserShortView;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;

@Getter
public class ProjectMemoView {

    private Long id;
    private UserShortView writer;
    private ProjectMemoCategory category;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    private List<Long> attendanceList;

    public static ProjectMemoView assemble(ProjectMemo source) {
        ProjectMemoView target = new ProjectMemoView();
        target.id = source.getId();
        target.writer = UserShortView.assemble(source.getWriter());
        target.category = source.getCategory();
        target.description = source.getDescription();
        target.createdAt = source.getCreatedAt();
        target.modifiedAt = source.getModifiedAt();
        target.attendanceList = source.getAttendanceList();
        return target;
    }
}
