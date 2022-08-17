package com.howoocast.hywtl_has.project_estimate.view;

import com.howoocast.hywtl_has.project_estimate.common.ProjectEstimateSheetStatus;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateSheet;
import com.howoocast.hywtl_has.user.view.UserShortView;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ProjectEstimateSheetShortView {

    private Long id;

    private Boolean confirmed;

    private ProjectEstimateSheetStatus status;

    private String title;

    private String note;

    private UserShortView writer;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    public static ProjectEstimateSheetShortView assemble(ProjectEstimateSheet source) {
        ProjectEstimateSheetShortView target = new ProjectEstimateSheetShortView();
        target.id = source.getId();
        target.confirmed = source.getConfirmed();
        target.status = source.getStatus();
        target.title = source.getTitle();
        target.note = source.getNote();
        target.writer = UserShortView.assemble(source.getWriter());
        target.createdAt = source.getCreatedAt();
        target.modifiedAt = source.getModifiedAt();
        return target;
    }
}
