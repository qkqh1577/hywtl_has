package com.howoocast.hywtl_has.project_basic.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicFailReason;
import java.util.Optional;

public interface ProjectBasicFailReasonRepository extends CustomRepository<ProjectBasicFailReason> {

    Optional<ProjectBasicFailReason> findByProject_Id(Long projectId);
}
