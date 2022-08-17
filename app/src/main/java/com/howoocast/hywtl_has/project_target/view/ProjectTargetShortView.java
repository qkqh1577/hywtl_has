package com.howoocast.hywtl_has.project_target.view;

import com.howoocast.hywtl_has.project_target.domain.ProjectTarget;
import com.howoocast.hywtl_has.project_target.domain.ProjectTargetDetail;
import com.howoocast.hywtl_has.user.view.UserShortView;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;
import lombok.Getter;

@Getter
public class ProjectTargetShortView {

    private Long id;

    private Boolean confirmed;

    private String code;

    private Integer detailCount;

    private List<String> testList;

    private UserShortView writer;

    private String note;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    public static ProjectTargetShortView assemble(ProjectTarget source) {
        ProjectTargetShortView target = new ProjectTargetShortView();
        target.id = source.getId();
        target.confirmed = Optional.ofNullable(source.getEstimateSheetList())
            .map(List::size).map(size -> size > 0).orElse(Boolean.FALSE);
        target.code = source.getCode();
        target.detailCount = source.getDetailList().size();
        target.testList = getTestList(source);
        target.writer = UserShortView.assemble(source.getWriter());
        target.note = source.getNote();
        target.createdAt = source.getCreatedAt();
        target.modifiedAt = source.getModifiedAt();
        return target;
    }

    private static List<String> getTestList(ProjectTarget source) {
        List<String> testList = new ArrayList<>();
        Consumer<List<String>> addTestList = (l) -> l.forEach(test -> {
            if (!testList.contains(test)) {
                testList.add(test);
            }
        });
        Optional.ofNullable(source.getTestList()).ifPresent(addTestList);
        source.getDetailList().stream().map(ProjectTargetDetail::getTestList).forEach(addTestList);
        return testList;
    }
}
