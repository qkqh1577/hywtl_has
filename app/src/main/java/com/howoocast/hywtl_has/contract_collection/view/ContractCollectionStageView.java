package com.howoocast.hywtl_has.contract_collection.view;

import com.howoocast.hywtl_has.contract_collection.domain.ContractCollectionStage;
import com.howoocast.hywtl_has.contract_collection.domain.ContractCollectionStageExpectedDateType;
import lombok.Getter;

@Getter
public class ContractCollectionStageView {

    private String name;
    private Double rate;
    private String note;
    private ContractCollectionStageExpectedDateType expectedDate;

    public static ContractCollectionStageView assemble(ContractCollectionStage source) {
        ContractCollectionStageView target = new ContractCollectionStageView();
        target.name = source.getName();
        target.rate = source.getRate();
        target.note = source.getNote();
        target.expectedDate = source.getExpectedDate();
        return target;
    }
}
