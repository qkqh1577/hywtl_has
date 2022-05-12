package com.howoocast.hywtl_has.project_estimate.view;

import com.howoocast.hywtl_has.project_estimate.common.ProjectEstimateSheetStatus;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateSheet;
import com.howoocast.hywtl_has.user.view.UserListView;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ProjectEstimateSheetListView {

    private Long id;

    private Boolean confirmed;

    private ProjectEstimateSheetStatus status;

    private String title;

    private String memo;

    private UserListView writer;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    public static ProjectEstimateSheetListView assemble(ProjectEstimateSheet source) {
        ProjectEstimateSheetListView target = new ProjectEstimateSheetListView();
        target.id = source.getId();
        target.confirmed = source.getConfirmed();
        target.status = source.getStatus();
        target.title = source.getTitle();
        target.memo = source.getMemo();
        target.writer = UserListView.assemble(source.getWriter());
        target.createdAt = source.getCreatedAt();
        target.modifiedAt = source.getModifiedAt();
        return target;
    }
}
