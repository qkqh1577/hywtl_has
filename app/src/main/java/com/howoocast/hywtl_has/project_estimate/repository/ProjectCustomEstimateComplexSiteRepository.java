package com.howoocast.hywtl_has.project_estimate.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectCustomEstimateComplexSite;
import java.util.List;

public interface ProjectCustomEstimateComplexSiteRepository extends CustomRepository<ProjectCustomEstimateComplexSite> {


    List<ProjectCustomEstimateComplexSite> findByEstimate_Id(Long estimateId);
}
