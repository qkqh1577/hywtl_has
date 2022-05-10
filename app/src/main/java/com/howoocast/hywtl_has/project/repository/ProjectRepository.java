package com.howoocast.hywtl_has.project.repository;

import com.howoocast.hywtl_has.project.domain.Project;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface ProjectRepository extends JpaRepository<Project, Long>, QuerydslPredicateExecutor<Project> {

    Optional<Project> findByIdAndDeletedAtIsNull(Long id);

}
