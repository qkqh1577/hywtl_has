package com.howoocast.hywtl_has.project_contract.parameter;

import com.howoocast.hywtl_has.project_contract.domain.ProjectContractCondition;
import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectContractConditionParameter {

    @NotBlank(message = ProjectContractCondition.KEY + ".title.not_blank")
    private String title;

    @NotEmpty(message = ProjectContractCondition.KEY + ".title.not_empty")
    private List<Description> descriptionList;

    @Getter
    @Setter
    public static class Description {
        private String description;
    }
}
