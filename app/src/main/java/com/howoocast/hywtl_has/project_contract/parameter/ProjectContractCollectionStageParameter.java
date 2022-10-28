package com.howoocast.hywtl_has.project_contract.parameter;

import com.howoocast.hywtl_has.project_contract.domain.ProjectContractCollection;
import java.time.LocalDate;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectContractCollectionStageParameter {

    @NotBlank(message = ProjectContractCollection.KEY + "_stage.name.not_blank")
    private String name;

    @NotNull(message = ProjectContractCollection.KEY + "_stage.rate.not_null")
    private Double rate;

    @NotNull(message = ProjectContractCollection.KEY + ".amount.not_null")
    private Long amount;

    private String note;

    @NotNull(message = ProjectContractCollection.KEY + "_stage.expected_date.not_null")
    private LocalDate expectedDate;
}
