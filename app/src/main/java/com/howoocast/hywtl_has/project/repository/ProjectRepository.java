package com.howoocast.hywtl_has.project.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project.domain.Project;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface ProjectRepository extends CustomRepository<Project>, QuerydslPredicateExecutor<Project> {

    List<Project> findByBasic_Name(String name);

//    @Query("select count(Project) from Project where createdAt between ?1 and ?2")
    Integer countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
}
