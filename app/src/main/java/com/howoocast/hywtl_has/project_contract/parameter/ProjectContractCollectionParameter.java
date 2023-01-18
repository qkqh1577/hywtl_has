package com.howoocast.hywtl_has.project_contract.parameter;

import com.howoocast.hywtl_has.project_contract.domain.ProjectContractCollection;
import java.util.List;
import javax.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectContractCollectionParameter {

    private String stageNote;

    @NotEmpty(message = ProjectContractCollection.KEY + ".stage_list.not_empty")
    private List<ProjectContractCollectionStageParameter> stageList;


    private String totalAmountNote;

    private Long totalAmount;

}
