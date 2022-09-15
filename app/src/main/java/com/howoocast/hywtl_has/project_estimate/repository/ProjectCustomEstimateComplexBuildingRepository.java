package com.howoocast.hywtl_has.project_estimate.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectCustomEstimateComplexBuilding;
import java.util.List;

public interface ProjectCustomEstimateComplexBuildingRepository extends
    CustomRepository<ProjectCustomEstimateComplexBuilding> {

    List<ProjectCustomEstimateComplexBuilding> findByEstimate_Id(Long estimateId);
}
