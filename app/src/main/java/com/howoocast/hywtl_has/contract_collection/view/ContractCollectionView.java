package com.howoocast.hywtl_has.contract_collection.view;

import com.howoocast.hywtl_has.contract_collection.domain.ContractCollection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class ContractCollectionView {

    private List<ContractCollectionStageView> stageList;
    private String totalAmountNote;

    public static ContractCollectionView assemble(ContractCollection source) {
        ContractCollectionView target = new ContractCollectionView();
        if (Objects.nonNull(source.getStageList())) {
            target.stageList = source.getStageList()
                .stream()
                .map(ContractCollectionStageView::assemble)
                .collect(Collectors.toList());
        }
        target.totalAmountNote = source.getTotalAmountNote();

        return target;
    }
}
