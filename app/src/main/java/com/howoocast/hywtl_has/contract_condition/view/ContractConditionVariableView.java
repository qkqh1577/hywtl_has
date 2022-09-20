package com.howoocast.hywtl_has.contract_condition.view;

import com.howoocast.hywtl_has.contract_condition.domain.ContractConditionVariable;
import lombok.Getter;

@Getter
public class ContractConditionVariableView {

    private String name;
    private String note;

    public static ContractConditionVariableView assemble(ContractConditionVariable source) {
        ContractConditionVariableView target = new ContractConditionVariableView();
        target.name = source.getName();
        target.note = source.getNote();
        return target;
    }
}
