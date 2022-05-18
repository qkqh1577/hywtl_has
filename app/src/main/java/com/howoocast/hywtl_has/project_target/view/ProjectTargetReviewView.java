package com.howoocast.hywtl_has.project_target.view;

import com.howoocast.hywtl_has.file.view.FileItemView;
import com.howoocast.hywtl_has.project_target.common.ProjectTargetReviewStatus;
import com.howoocast.hywtl_has.project_target.domain.ProjectTargetReview;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class ProjectTargetReviewView {

    private Long id;

    private ProjectTargetReviewStatus status;

    private Boolean confirmed;

    private String code;

    private Integer landFigureCount;
    private List<ProjectTargetReviewDetailView> detailList;

    private List<String> testList;

    private List<FileItemView> fileList;

    public static ProjectTargetReviewView assemble(ProjectTargetReview source) {
        ProjectTargetReviewView target = new ProjectTargetReviewView();
        target.id = source.getId();
        target.status = source.getStatus();
        target.confirmed = Optional.ofNullable(source.getEstimateSheetList())
            .map(List::size).map(size -> size > 0).orElse(Boolean.FALSE);
        target.code = source.getCode();
        target.landFigureCount = source.getLandFigureCount();
        target.detailList = source.getDetailList().stream()
            .map(ProjectTargetReviewDetailView::assemble)
            .collect(Collectors.toList());
        target.testList = source.getTestList();
        target.fileList = Optional.ofNullable(source.getFileList())
            .map(list -> list.stream().map(FileItemView::assemble).collect(Collectors.toList()))
            .orElse(null);
        return target;
    }

}
