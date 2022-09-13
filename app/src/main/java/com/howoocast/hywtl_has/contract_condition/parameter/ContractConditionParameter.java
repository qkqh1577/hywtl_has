package com.howoocast.hywtl_has.contract_condition.parameter;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContractConditionParameter {

    private List<ContractConditionItemParameter> contractConditionList;

    @Getter
    @Setter
    public static class ContractConditionItemParameter {

        private Long id;
        private String title;
        private List<String> descriptionList;
    }
}
