package com.howoocast.hywtl_has.project_estimate.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_estimate.domain.RivalEstimate;
import java.util.List;

public interface RivalEstimateRepository extends CustomRepository<RivalEstimate> {

    List<RivalEstimate> findByProject_Id(Long projectId);

    List<RivalEstimate> findByBusiness_Id(Long businessId);
}
