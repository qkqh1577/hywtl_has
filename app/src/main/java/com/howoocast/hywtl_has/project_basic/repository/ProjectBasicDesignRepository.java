package com.howoocast.hywtl_has.project_basic.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicDesign;
import java.util.Optional;

public interface ProjectBasicDesignRepository extends CustomRepository<ProjectBasicDesign> {

    Optional<ProjectBasicDesign> findByProject_Id(Long projectId);
}
