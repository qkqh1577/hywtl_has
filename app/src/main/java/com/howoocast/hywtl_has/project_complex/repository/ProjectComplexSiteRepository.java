package com.howoocast.hywtl_has.project_complex.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_complex.domain.ProjectComplexSite;
import java.util.List;

public interface ProjectComplexSiteRepository extends CustomRepository<ProjectComplexSite> {

    List<ProjectComplexSite> findByProject_Id(Long projectId);
}
