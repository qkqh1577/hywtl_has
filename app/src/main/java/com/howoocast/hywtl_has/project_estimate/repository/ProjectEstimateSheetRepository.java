package com.howoocast.hywtl_has.project_estimate.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateSheet;
import java.util.List;

public interface ProjectEstimateSheetRepository extends CustomRepository<ProjectEstimateSheet> {

    List<ProjectEstimateSheet> findByProject_Id(Long projectId);
}
