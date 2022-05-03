package com.howoocast.hywtl_has.project.view;

import com.howoocast.hywtl_has.project.domain.ProjectTarget;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.Getter;
import org.springframework.lang.Nullable;

@Getter
public class ProjectTargetView {

    private Integer landModelCount;

    private List<ProjectTargetReviewView> reviewList;

    private List<ProjectTargetDocumentView> documentList;

    private LocalDateTime updatedTime;

    public static ProjectTargetView assemble(@Nullable ProjectTarget source) {
        ProjectTargetView target = new ProjectTargetView();
        if(Objects.isNull(source)) {
            return target;
        }
        target.landModelCount = source.getLandModelCount();
        target.reviewList = source.getReviewList().stream()
            .map(ProjectTargetReviewView::assemble)
            .collect(Collectors.toList());
        target.documentList = source.getDocumentList().stream()
            .map(ProjectTargetDocumentView::assemble)
            .collect(Collectors.toList());
        target.updatedTime = source.getUpdatedTime();
        return target;
    }
}
