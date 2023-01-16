package com.howoocast.hywtl_has.project_contract.parameter;

import com.howoocast.hywtl_has.project_contract.domain.ProjectContract;
import java.util.List;
import javax.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProjectContractConfirmedParameter {

    @NotEmpty(message = ProjectContract.KEY + ".contract_id.not_empty")
    private List<Long> contractIdList;
}
