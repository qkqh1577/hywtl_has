package com.howoocast.hywtl_has.project.repository;

import com.howoocast.hywtl_has.project.domain.ProjectTargetDocument;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectTargetDocumentRepository extends JpaRepository<ProjectTargetDocument, Long> {

    List<ProjectTargetDocument> findByProject_IdAndDeletedAtIsNull(Long projectId);

    Optional<ProjectTargetDocument> findByIdAndDeletedAtIsNull(Long id);
}
