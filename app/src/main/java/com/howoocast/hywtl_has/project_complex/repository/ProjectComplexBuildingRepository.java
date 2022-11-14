package com.howoocast.hywtl_has.project_complex.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_complex.domain.ProjectComplexBuilding;
import java.util.List;
import java.util.Optional;

public interface ProjectComplexBuildingRepository extends CustomRepository<ProjectComplexBuilding> {

    List<ProjectComplexBuilding> findByProject_Id(Long projectId);

    Optional<ProjectComplexBuilding> findByBuildingDocument_Id(Long id);
}
