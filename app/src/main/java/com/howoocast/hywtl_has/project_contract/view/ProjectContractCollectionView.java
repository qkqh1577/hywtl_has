package com.howoocast.hywtl_has.project_contract.view;

import com.howoocast.hywtl_has.project_contract.domain.ProjectContractCollection;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class ProjectContractCollectionView {

    private String stageNote;
    private List<ProjectContractCollectionStageView> stageList;
    private String totalAmountNote;

    public static ProjectContractCollectionView assemble(ProjectContractCollection source) {
        ProjectContractCollectionView target = new ProjectContractCollectionView();
        target.stageNote = source.getStageNote();
        target.stageList = source.getStageList().stream()
            .map(ProjectContractCollectionStageView::assemble)
            .collect(Collectors.toList());
        target.totalAmountNote = source.getTotalAmountNote();
        return target;
    }
}
