package com.howoocast.hywtl_has.project_basic.repository;

import com.howoocast.hywtl_has.business.domain.BusinessManager;
import com.howoocast.hywtl_has.business.domain.ProjectInvolvedType;
import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicBusiness;
import java.util.List;

public interface ProjectBasicBusinessRepository extends CustomRepository<ProjectBasicBusiness> {


    List<ProjectBasicBusiness> findByProject_Id(Long projectId);

    List<ProjectBasicBusiness> findByBusiness_Id(Long businessId);

    List<ProjectBasicBusiness> findByBusiness_IdAndInvolvedType(Long businessId, ProjectInvolvedType involvedType);

    List<ProjectBasicBusiness> findByBusinessManager_Id(Long managerId);

    /**
     * @migration
     * @param businessName
     * @param project
     * @param involvedType
     * @return
     */
    List<ProjectBasicBusiness> findByBusiness_NameAndProjectAndInvolvedType(String businessName, Project project, ProjectInvolvedType involvedType);
    /**
     * @migration
     * @param businessName
     * @param project
     * @param involvedType
     * @param businessManager
     * @return
     */
    List<ProjectBasicBusiness> findByBusiness_NameAndProjectAndInvolvedTypeAndBusinessManager(String businessName, Project project, ProjectInvolvedType architectural, BusinessManager businessManager);
    /**
     * @migration
     * @param businessName
     * @param project
     * @param businessManagerName
     * @return
     */
    List<ProjectBasicBusiness> findByBusiness_NameAndProjectAndInvolvedTypeAndBusinessManager_Name(String businessName, Project project, ProjectInvolvedType projectInvolvedType, String businessManagerName);

    Boolean existsByBusiness_Id(Long id);

    Boolean existsByBusinessManager_Id(Long id);
}
