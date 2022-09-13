package com.howoocast.hywtl_has.contract_collection.parameter;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContractCollectionParameter {

    private List<ContractCollectionStageParameter> stageList;

    private String totalAmountNote;

}


