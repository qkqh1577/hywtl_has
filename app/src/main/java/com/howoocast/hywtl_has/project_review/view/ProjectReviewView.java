package com.howoocast.hywtl_has.project_review.view;

import com.howoocast.hywtl_has.file.view.FileItemView;
import com.howoocast.hywtl_has.project_review.common.ProjectReviewStatus;
import com.howoocast.hywtl_has.project_review.domain.ProjectReview;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class ProjectReviewView {

    private Long id;

    private ProjectReviewStatus status;

    private Boolean confirmed;

    private String code;

    private Integer landFigureCount;
    private List<ProjectReviewDetailView> detailList;

    private List<String> testList;

    private List<FileItemView> fileList;

    public static ProjectReviewView assemble(ProjectReview source) {
        ProjectReviewView target = new ProjectReviewView();
        target.id = source.getId();
        target.status = source.getStatus();
        target.confirmed = Optional.ofNullable(source.getEstimateSheetList())
            .map(List::size).map(size -> size > 0).orElse(Boolean.FALSE);
        target.code = source.getCode();
        target.landFigureCount = source.getLandFigureCount();
        target.detailList = source.getDetailList().stream()
            .map(ProjectReviewDetailView::assemble)
            .collect(Collectors.toList());
        target.testList = source.getTestList();
        target.fileList = Optional.ofNullable(source.getFileList())
            .map(list -> list.stream().map(FileItemView::assemble).collect(Collectors.toList()))
            .orElse(null);
        return target;
    }
}
