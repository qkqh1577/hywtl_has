package com.howoocast.hywtl_has.project_target.view;

import com.howoocast.hywtl_has.project_target.common.ProjectTargetReviewStatus;
import com.howoocast.hywtl_has.project_target.domain.ProjectTargetReview;
import com.howoocast.hywtl_has.project_target.domain.ProjectTargetReviewDetail;
import com.howoocast.hywtl_has.user.view.UserListView;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;
import lombok.Getter;

@Getter
public class ProjectTargetReviewListView {

    private Long id;

    private ProjectTargetReviewStatus status;

    private Boolean confirmed;

    private String code;

    private Integer detailCount;

    private List<String> testList;

    private Integer fileCount;

    private UserListView writer;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    public static ProjectTargetReviewListView assemble(ProjectTargetReview source) {
        ProjectTargetReviewListView target = new ProjectTargetReviewListView();
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

    private static List<String> getTestList(ProjectTargetReview source) {
        List<String> testList = new ArrayList<>();
        Consumer<List<String>> addTestList = (l) -> l.forEach(test -> {
            if (!testList.contains(test)) {
                testList.add(test);
            }
        });
        Optional.ofNullable(source.getTestList()).ifPresent(addTestList);
        source.getDetailList().stream().map(ProjectTargetReviewDetail::getTestList).forEach(addTestList);
        return testList;
    }
}
