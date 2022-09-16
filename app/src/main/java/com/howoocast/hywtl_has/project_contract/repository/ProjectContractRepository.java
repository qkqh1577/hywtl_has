package com.howoocast.hywtl_has.project_contract.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContract;
import java.util.List;
import org.springframework.data.jpa.repository.Query;

public interface ProjectContractRepository extends CustomRepository<ProjectContract> {

    List<ProjectContract> findByProject_Id(Long projectId);

    @Query(
        value = "select count(*) + 1 from "
            + ProjectContract.KEY
            + " where project_id = ?1",
        nativeQuery = true
    )
    Long findNextSeq(Long projectId);
}
