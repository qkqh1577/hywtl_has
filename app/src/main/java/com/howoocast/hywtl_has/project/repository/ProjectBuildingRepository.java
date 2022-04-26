package com.howoocast.hywtl_has.project.repository;

import com.howoocast.hywtl_has.project.domain.ProjectBuilding;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectBuildingRepository extends JpaRepository<ProjectBuilding, Long> {

    Optional<ProjectBuilding> findByIdAndDeletedTimeIsNull(Long id);

    Optional<ProjectBuilding> findByProject_IdAndDeletedTimeIsNull(Long projectId);
}
