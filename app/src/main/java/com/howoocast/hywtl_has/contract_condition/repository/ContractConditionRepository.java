package com.howoocast.hywtl_has.contract_condition.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.contract_condition.domain.ContractCondition;
import java.util.List;

public interface ContractConditionRepository extends CustomRepository<ContractCondition> {

    List<ContractCondition> findAll();
}
