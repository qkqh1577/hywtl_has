package com.howoocast.hywtl_has.project_target.view;

import com.howoocast.hywtl_has.project_target.domain.ProjectTarget;
import com.howoocast.hywtl_has.user.view.UserListView;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class ProjectTargetView {

    private Long id;

    private Boolean confirmed;

    private String code;

    private List<String> testList;

    private String memo;

    private UserListView writer;

    private List<ProjectTargetDetailView> detailList;

    public static ProjectTargetView assemble(ProjectTarget source) {
        ProjectTargetView target = new ProjectTargetView();
        target.id = source.getId();
        target.confirmed = Optional.ofNullable(source.getEstimateSheetList())
            .map(List::size).map(size -> size > 0).orElse(Boolean.FALSE);
        target.code = source.getCode();
        target.testList = source.getTestList();
        target.memo = source.getMemo();
        target.writer = UserListView.assemble(source.getWriter());
        target.detailList = source.getDetailList().stream()
            .map(ProjectTargetDetailView::assemble)
            .collect(Collectors.toList());
        return target;
    }
}
