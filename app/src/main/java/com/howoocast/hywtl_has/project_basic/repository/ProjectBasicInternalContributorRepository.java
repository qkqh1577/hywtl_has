package com.howoocast.hywtl_has.project_basic.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicInternalContributor;
import java.util.List;

public interface ProjectBasicInternalContributorRepository extends CustomRepository<ProjectBasicInternalContributor> {

    List<ProjectBasicInternalContributor> findByProject_Id(Long projectId);
}
