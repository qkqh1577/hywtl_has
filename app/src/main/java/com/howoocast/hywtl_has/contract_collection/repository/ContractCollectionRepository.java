package com.howoocast.hywtl_has.contract_collection.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.contract_collection.domain.ContractCollection;
import java.util.Optional;

public interface ContractCollectionRepository extends CustomRepository<ContractCollection> {

    Optional<ContractCollection> findTop1By();
}
