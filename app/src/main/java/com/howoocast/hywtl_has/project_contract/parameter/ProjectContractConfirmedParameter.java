package com.howoocast.hywtl_has.project_contract.parameter;

import com.howoocast.hywtl_has.project_contract.domain.ProjectContract;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectContractConfirmedParameter {

    @NotNull(message = ProjectContract.KEY + ".contract_id.not_null")
    private Long contractId;
}
