package com.howoocast.hywtl_has.contract_basic.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.contract_basic.domain.ContractBasic;
import java.util.Optional;

public interface ContractBasicRepository extends CustomRepository<ContractBasic> {

    Optional<ContractBasic> findTop1By();
}
