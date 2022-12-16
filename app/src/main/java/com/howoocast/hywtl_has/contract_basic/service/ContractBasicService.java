package com.howoocast.hywtl_has.contract_basic.service;

import com.howoocast.hywtl_has.contract_basic.domain.ContractBasic;
import com.howoocast.hywtl_has.contract_basic.parameter.ContractBasicParameter;
import com.howoocast.hywtl_has.contract_basic.repository.ContractBasicRepository;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContractBasicService {


    private final ContractBasicRepository repository;

    @Transactional(readOnly = true)
    public ContractBasic get() {
        return this.load();
    }

    @Transactional
    public void upsert(ContractBasicParameter parameter) {
        ContractBasic instance = this.load();
        instance.change(
            parameter.getServiceDuration(),
            parameter.getCollectionStageNote(),
            parameter.getOutcome(),
            parameter.getDescription(),
            Optional.ofNullable(parameter.getContractor()).map(ContractBasicParameter.ContractBasicContractorParameter::getAddress).orElse(null),
            Optional.ofNullable(parameter.getContractor()).map(ContractBasicParameter.ContractBasicContractorParameter::getCompanyName).orElse(null),
            Optional.ofNullable(parameter.getContractor()).map(ContractBasicParameter.ContractBasicContractorParameter::getCeoName).orElse(null)
        );

        if (Objects.isNull(instance.getId())) {
            repository.save(instance);
        }
    }

    private ContractBasic load() {
        return repository.findTop1By().orElse(ContractBasic.of());
    }
}
