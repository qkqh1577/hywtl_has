package com.howoocast.hywtl_has.contract_basic.parameter;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContractBasicParameter {


    private String serviceDuration;

    private String collectionStageNote;

    private String outcome;

    private String description;

    private ContractBasicContractorParameter contractor;

    @Getter
    @Setter
    public static class ContractBasicContractorParameter {

        private String address;

        private String companyName;

        private String ceoName;
    }
}
