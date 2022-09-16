package com.howoocast.hywtl_has.project_contract.parameter;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectContractCollectionStageParameter {

    private String name;
    private Double ratio;
    private String note;
    private LocalDate expectedDate;
}
