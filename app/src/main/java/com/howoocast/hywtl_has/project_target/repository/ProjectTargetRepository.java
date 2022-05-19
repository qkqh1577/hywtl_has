package com.howoocast.hywtl_has.project_target.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_target.domain.ProjectTarget;
import java.util.List;
import java.util.Optional;

public interface ProjectTargetRepository extends CustomRepository<ProjectTarget> {

    List<ProjectTarget> findByProject_Id(Long projectId);

    Optional<ProjectTarget> findByCode(String code);

}
