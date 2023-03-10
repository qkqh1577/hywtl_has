package com.howoocast.hywtl_has.project.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project.domain.Project;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface ProjectRepository extends CustomRepository<Project>, QuerydslPredicateExecutor<Project> {

    List<Project> findByBasic_Name(String name);

//    @Query("select count(Project) from Project where createdAt between ?1 and ?2")
    Integer countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    Integer countByCreatedAtBefore(LocalDateTime createdAt);

    /**
     * @migration 마이그레이션 용도
     * @param projectCode
     * @return
     */
    Optional<Project> findByBasic_Code(String code);
}
