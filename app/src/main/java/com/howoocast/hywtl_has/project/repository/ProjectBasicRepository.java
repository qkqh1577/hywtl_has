package com.howoocast.hywtl_has.project.repository;

import com.howoocast.hywtl_has.project.domain.ProjectBasic;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectBasicRepository extends JpaRepository<ProjectBasic, Long> {

    Optional<ProjectBasic> findByIdAndDeletedTimeIsNull(Long id);
}
