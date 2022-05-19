package com.howoocast.hywtl_has.project_review.view;

import com.howoocast.hywtl_has.project_review.common.ProjectReviewStatus;
import com.howoocast.hywtl_has.project_review.domain.ProjectReview;
import com.howoocast.hywtl_has.project_review.domain.ProjectReviewDetail;
import com.howoocast.hywtl_has.user.view.UserListView;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;
import lombok.Getter;

@Getter
public class ProjectReviewListView {
    private Long id;

    private ProjectReviewStatus status;

    private Boolean confirmed;

    private String code;

    private Integer detailCount;

    private List<String> testList;

    private Integer fileCount;

    private UserListView writer;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    public static ProjectReviewListView assemble(ProjectReview source) {
        ProjectReviewListView target = new ProjectReviewListView();
        target.id = source.getId();
        target.status = source.getStatus();
        target.confirmed = Optional.ofNullable(source.getEstimateSheetList())
            .map(List::size).map(size -> size > 0).orElse(Boolean.FALSE);
        target.code = source.getCode();
        target.detailCount = source.getDetailList().size();
        target.testList = getTestList(source);
        target.fileCount = Optional.ofNullable(source.getFileList()).map(List::size).orElse(0);
        target.writer = UserListView.assemble(source.getWriter());
        target.createdAt = source.getCreatedAt();
        target.modifiedAt = source.getModifiedAt();
        return target;
    }

    private static List<String> getTestList(ProjectReview source) {
        List<String> testList = new ArrayList<>();
        Consumer<List<String>> addTestList = (l) -> l.forEach(test -> {
            if (!testList.contains(test)) {
                testList.add(test);
            }
        });
        Optional.ofNullable(source.getTestList()).ifPresent(addTestList);
        source.getDetailList().stream().map(ProjectReviewDetail::getTestList).forEach(addTestList);
        return testList;
    }
}
