package com.howoocast.hywtl_has.project_basic.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicExternalContributor;
import java.util.List;

public interface ProjectBasicExternalContributorRepository extends CustomRepository<ProjectBasicExternalContributor> {

    List<ProjectBasicExternalContributor> findByProject_Id(Long projectId);

    Boolean existsByBusinessManager_Id(Long id);
}
