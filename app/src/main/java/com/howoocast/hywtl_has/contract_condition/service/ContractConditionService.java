package com.howoocast.hywtl_has.contract_condition.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.contract_condition.domain.ContractCondition;
import com.howoocast.hywtl_has.contract_condition.parameter.ContractConditionParameter;
import com.howoocast.hywtl_has.contract_condition.repository.ContractConditionRepository;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContractConditionService {


    private final ContractConditionRepository repository;

    @Transactional(readOnly = true)
    public List<ContractCondition> getList() {
        return repository.findAll();
    }

    @Transactional
    public void upsert(ContractConditionParameter parameter) {

        List<ContractCondition> prevList = repository.findAll();

        if (Objects.isNull(parameter.getContractConditionList()) || parameter.getContractConditionList().isEmpty()) {
            // TODO: remove all
            return;
        }

        List<ContractCondition> list = parameter.getContractConditionList()
            .stream()
            .map(parameterItem -> {
                if (Objects.nonNull(parameterItem.getId())) {
                    ContractCondition instance = prevList.stream()
                        .filter(item -> item.getId().equals(parameterItem.getId()))
                        .findFirst()
                        .orElseThrow(() -> {
                            throw new NotFoundException(ContractCondition.KEY, parameterItem.getId());
                        });
                    instance.change(
                        parameterItem.getTitle(),
                        parameterItem.getDescriptionList()
                    );
                    return instance;
                }

                ContractCondition instance = ContractCondition.of(
                    parameterItem.getTitle(),
                    parameterItem.getDescriptionList()
                );
                return repository.save(instance);
            })
            .collect(Collectors.toList());

        prevList.stream()
            .filter(prev -> list.stream().noneMatch(item -> item.getId().equals(prev.getId())))
            .forEach(ContractCondition::delete);

    }
}
