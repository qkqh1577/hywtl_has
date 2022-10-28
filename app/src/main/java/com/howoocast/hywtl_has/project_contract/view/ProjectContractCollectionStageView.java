package com.howoocast.hywtl_has.project_contract.view;

import com.howoocast.hywtl_has.project_contract.domain.ProjectContractCollectionStage;
import java.time.LocalDate;
import lombok.Getter;

@Getter
public class ProjectContractCollectionStageView {

    private String name;
    private Double rate;
    private Long amount;
    private String note;
    private LocalDate expectedDate;

    public static ProjectContractCollectionStageView assemble(ProjectContractCollectionStage source) {
        ProjectContractCollectionStageView target = new ProjectContractCollectionStageView();
        target.name = source.getName();
        target.rate = source.getRate();
        target.amount = source.getAmount();
        target.note = source.getNote();
        target.expectedDate = source.getExpectedDate();
        return target;
    }

}
