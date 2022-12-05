package com.howoocast.hywtl_has.project_schedule.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_schedule.domain.ProjectSchedule;
import com.querydsl.core.types.Predicate;
import java.util.List;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface ProjectScheduleRepository extends CustomRepository<ProjectSchedule>,
    QuerydslPredicateExecutor<ProjectSchedule> {

    List<ProjectSchedule> findAll(Predicate predicate);

    List<ProjectSchedule> findByProject_Id(Long id);
}
