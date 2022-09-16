package com.howoocast.hywtl_has.project_contract.parameter;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectContractCollectionParameter {

    private String stageNote;
    private List<ProjectContractCollectionStageParameter> stageList;
    private String totalAmountNote;
}
