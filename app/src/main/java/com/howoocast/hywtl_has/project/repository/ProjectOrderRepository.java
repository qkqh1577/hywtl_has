package com.howoocast.hywtl_has.project.repository;

import com.howoocast.hywtl_has.project.domain.ProjectOrder;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectOrderRepository extends JpaRepository<ProjectOrder, Long> {

    Optional<ProjectOrder> findByProject_IdAndDeletedTimeIsNull(Long projectId);
}
