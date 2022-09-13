package com.howoocast.hywtl_has.contract_basic.view;

import com.howoocast.hywtl_has.contract_basic.domain.ContractBasic;
import com.howoocast.hywtl_has.contract_basic.domain.ContractBasicContractor;
import java.util.Objects;
import lombok.Getter;
import org.springframework.lang.Nullable;

@Getter
public class ContractBasicView {

    private String serviceDuration;
    private String collectionStageNote;
    private String outcome;
    private String description;
    private ContractBasicContractorView contractor;

    @Getter
    public static class ContractBasicContractorView {

        private String address;
        private String companyName;
        private String ceoName;


        public static ContractBasicContractorView assemble(@Nullable ContractBasicContractor source) {
            ContractBasicContractorView target = new ContractBasicContractorView();
            if (Objects.nonNull(source)) {
                target.address = source.getAddress();
                target.companyName = source.getCompanyName();
                target.ceoName = source.getCeoName();
            }
            return target;
        }
    }

    public static ContractBasicView assemble(ContractBasic source) {
        ContractBasicView target = new ContractBasicView();
        target.serviceDuration = source.getServiceDuration();
        target.collectionStageNote = source.getCollectionStageNote();
        target.outcome = source.getOutcome();
        target.description = source.getDescription();
        target.contractor = ContractBasicContractorView.assemble(source.getContractor());
        return target;
    }
}
