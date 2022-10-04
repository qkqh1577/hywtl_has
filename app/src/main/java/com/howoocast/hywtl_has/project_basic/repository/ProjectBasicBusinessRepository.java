package com.howoocast.hywtl_has.project_basic.repository;

import com.howoocast.hywtl_has.business.domain.ProjectInvolvedType;
import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicBusiness;
import java.util.List;

public interface ProjectBasicBusinessRepository extends CustomRepository<ProjectBasicBusiness> {


    List<ProjectBasicBusiness> findByProject_Id(Long projectId);

    List<ProjectBasicBusiness> findByBusiness_Id(Long businessId);

    List<ProjectBasicBusiness> findByBusiness_IdAndInvolvedType(Long businessId, ProjectInvolvedType involvedType);

    List<ProjectBasicBusiness> findByBusinessManager_Id(Long managerId);
}
