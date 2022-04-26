package com.howoocast.hywtl_has.project.view;

import com.howoocast.hywtl_has.project.common.ProjectStatus;
import com.howoocast.hywtl_has.project.domain.ProjectBasic;
import com.howoocast.hywtl_has.user.view.UserListView;
import lombok.Getter;

@Getter
public class ProjectBasicView {

    private String code;

    private String name;

    private String alias;

    private ProjectStatus status;

    private UserListView salesManager;

    private UserListView projectManager;

    public static ProjectBasicView assemble(ProjectBasic source) {
        ProjectBasicView target = new ProjectBasicView();
        target.code = source.getCode();
        target.name = source.getName();
        target.alias = source.getAlias();
        target.status = source.getStatus();
        target.salesManager = UserListView.assemble(source.getSalesManager());
        target.projectManager = UserListView.assemble(source.getProjectManager());
        return target;
    }
}
