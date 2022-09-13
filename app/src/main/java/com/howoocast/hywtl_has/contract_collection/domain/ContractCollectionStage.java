package com.howoocast.hywtl_has.contract_collection.domain;

import javax.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class ContractCollectionStage {

    private String name;

    private Double ratio;

    private String note;

    private ContractCollectionStageExpectedDateType expectedDate;

    public static ContractCollectionStage of(
        String name,
        Double ratio,
        String note,
        ContractCollectionStageExpectedDateType expectedDate
    ) {
        ContractCollectionStage instance = new ContractCollectionStage();
        instance.name = name;
        instance.ratio = ratio;
        instance.note = note;
        instance.expectedDate = expectedDate;

        return instance;
    }
}
