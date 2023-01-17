package com.howoocast.hywtl_has.project_estimate.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectFinalEstimate;
import java.util.Optional;

public interface ProjectFinalEstimateRepository extends CustomRepository<ProjectFinalEstimate> {

    Optional<ProjectFinalEstimate> findByProject_Id(Long projectId);
}
