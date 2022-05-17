package com.howoocast.hywtl_has.project_estimate.view;

import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateSheetComment;
import lombok.Getter;

@Getter
public class ProjectEstimateSheetCommentView {

    private Integer seq;

    private String description;

    private Boolean inUse;

    public static ProjectEstimateSheetCommentView assemble(ProjectEstimateSheetComment source) {
        ProjectEstimateSheetCommentView target = new ProjectEstimateSheetCommentView();
        target.seq = source.getSeq();
        target.description = source.getDescription();
        target.inUse = source.getInUse();
        return target;
    }
}
