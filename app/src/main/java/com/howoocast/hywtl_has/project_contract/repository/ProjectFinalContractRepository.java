package com.howoocast.hywtl_has.project_contract.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_contract.domain.ProjectFinalContract;
import java.util.Optional;

public interface ProjectFinalContractRepository extends CustomRepository<ProjectFinalContract> {

    Optional<ProjectFinalContract> findByProject_Id(Long projectId);

    Boolean existsByBusiness_Id(Long id);
}
