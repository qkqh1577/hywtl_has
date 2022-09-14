package com.howoocast.hywtl_has.project_log.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_log.domain.ProjectLog;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface ProjectLogRepository extends CustomRepository<ProjectLog>, QuerydslPredicateExecutor<ProjectLog> {

}
