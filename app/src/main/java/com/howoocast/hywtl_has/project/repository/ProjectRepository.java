package com.howoocast.hywtl_has.project.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project.domain.Project;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface ProjectRepository extends CustomRepository<Project>, QuerydslPredicateExecutor<Project> {

}
