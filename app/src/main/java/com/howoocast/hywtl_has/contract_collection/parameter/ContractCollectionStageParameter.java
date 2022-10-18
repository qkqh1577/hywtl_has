package com.howoocast.hywtl_has.contract_collection.parameter;

import com.howoocast.hywtl_has.contract_collection.domain.ContractCollectionStageExpectedDateType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContractCollectionStageParameter {

    private String name;
    private Double ratio;
    private String note;
    private ContractCollectionStageExpectedDateType expectedDate;
}
