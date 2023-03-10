package com.howoocast.hywtl_has.project_log.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_log.domain.ProjectLog;
import java.util.List;

public interface ProjectLogRepository extends CustomRepository<ProjectLog> {
    List<ProjectLog> findByProject_Id(Long id);

}
