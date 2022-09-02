package com.howoocast.hywtl_has.project_complex.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_complex.domain.ProjectComplexBuilding;
import java.util.List;

public interface ProjectComplexBuildingRepository extends CustomRepository<ProjectComplexBuilding> {

    List<ProjectComplexBuilding> findByProject_Id(Long projectId);
}
