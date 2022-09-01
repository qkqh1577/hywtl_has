package com.howoocast.hywtl_has.project_basic.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicBusiness;
import java.util.List;

public interface ProjectBasicBusinessRepository extends CustomRepository<ProjectBasicBusiness> {


    List<ProjectBasicBusiness> findByProject_Id(Long projectId);
}
