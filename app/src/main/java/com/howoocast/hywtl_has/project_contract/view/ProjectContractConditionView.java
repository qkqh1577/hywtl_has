package com.howoocast.hywtl_has.project_contract.view;

import com.howoocast.hywtl_has.project_contract.domain.ProjectContractCondition;
import java.util.List;
import lombok.Getter;

@Getter
public class ProjectContractConditionView {

    private String title;
    private List<String> descriptionList;

    public static ProjectContractConditionView assemble(ProjectContractCondition source) {
        ProjectContractConditionView target = new ProjectContractConditionView();
        target.title = source.getTitle();
        target.descriptionList = source.getDescriptionList();
        return target;
    }
}
