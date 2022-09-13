package com.howoocast.hywtl_has.contract_condition.view;

import com.howoocast.hywtl_has.contract_condition.domain.ContractCondition;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class ContractConditionView {

    private List<ContractConditionItemView> contractConditionList;

    public static ContractConditionView assemble(List<ContractCondition> list) {
        ContractConditionView target = new ContractConditionView();
        target.contractConditionList = list.stream().map(ContractConditionItemView::assemble)
            .collect(Collectors.toList());
        return target;
    }

    @Getter
    public static class ContractConditionItemView {

        private Long id;
        private String title;
        private List<String> descriptionList;

        public static ContractConditionItemView assemble(ContractCondition source) {
            ContractConditionItemView target = new ContractConditionItemView();
            target.id = source.getId();
            target.title = source.getTitle();
            target.descriptionList = source.getDescriptionList();
            return target;
        }
    }
}
