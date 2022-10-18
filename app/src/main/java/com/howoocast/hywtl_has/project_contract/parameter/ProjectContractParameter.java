package com.howoocast.hywtl_has.project_contract.parameter;

import com.howoocast.hywtl_has.project_contract.domain.ProjectContract;
import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectContractParameter {

    @NotNull(message = ProjectContract.KEY + ".estimate_id.not_null")
    private Long estimateId;

    @NotNull(message = ProjectContract.KEY + ".is_sent.not_null")
    private Boolean isSent;

    @NotBlank(message = ProjectContract.KEY + ".recipient.not_blank")
    private String recipient;

    private String note;

    @NotNull(message = ProjectContract.KEY + ".basic.not_null")
    private ProjectContractBasicParameter basic;

    @NotNull(message = ProjectContract.KEY + ".collection.not_null")
    private ProjectContractCollectionParameter collection;

    @NotEmpty(message = ProjectContract.KEY + ".condition_list.not_empty")
    private List<ProjectContractConditionParameter> conditionList;

}
