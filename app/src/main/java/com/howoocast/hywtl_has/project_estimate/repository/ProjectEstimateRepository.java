package com.howoocast.hywtl_has.project_estimate.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import java.util.List;
import org.springframework.data.jpa.repository.Query;

public interface ProjectEstimateRepository extends CustomRepository<ProjectEstimate> {

    List<ProjectEstimate> findByProject_Id(Long projectId);

    @Query(
        value = "select count(*) + 1 from "
            + ProjectEstimate.KEY
            + " where project_id = ?1",
        nativeQuery = true
    )
    Long findNextSeq(Long projectId);
}
