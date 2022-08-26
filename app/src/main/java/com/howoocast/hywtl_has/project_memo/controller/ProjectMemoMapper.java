package com.howoocast.hywtl_has.project_memo.controller;

import com.howoocast.hywtl_has.project_memo.domain.ProjectMemo;
import com.howoocast.hywtl_has.project_memo.view.ProjectMemoView;
import org.springframework.data.domain.Page;

public final class ProjectMemoMapper {

    public static Page<ProjectMemoView> toView(Page<ProjectMemo> source) {
        return source.map(ProjectMemoView::assemble);
    }

    public static ProjectMemoView toView(ProjectMemo source) {
        return ProjectMemoView.assemble(source);
    }
}
