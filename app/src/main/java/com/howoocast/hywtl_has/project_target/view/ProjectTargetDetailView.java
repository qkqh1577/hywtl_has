package com.howoocast.hywtl_has.project_target.view;

import com.howoocast.hywtl_has.project_target.domain.ProjectTargetDetail;
import java.util.List;
import lombok.Getter;

@Getter
public class ProjectTargetDetailView {

    private Long id;

    private String buildingName;

    private List<String> testList;

    private String memo;

    public static ProjectTargetDetailView assemble(ProjectTargetDetail source) {
        ProjectTargetDetailView target = new ProjectTargetDetailView();
        target.id = source.getId();
        target.buildingName = source.getBuildingName();
        target.testList = source.getTestList();
        target.memo = source.getMemo();
        return target;
    }
}
