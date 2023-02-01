package com.howoocast.hywtl_has.rival_estimate.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.rival_estimate.domain.RivalEstimate;
import java.util.List;

public interface RivalEstimateRepository extends CustomRepository<RivalEstimate> {

    List<RivalEstimate> findByProject_Id(Long projectId);

    Boolean existsByBusiness_Id(Long businessId);
}
