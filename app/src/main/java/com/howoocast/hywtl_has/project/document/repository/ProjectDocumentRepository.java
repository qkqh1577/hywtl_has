package com.howoocast.hywtl_has.project.document.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project.document.domain.ProjectDocument;
import com.howoocast.hywtl_has.project.document.domain.ProjectDocumentType;
import java.util.List;
import org.springframework.data.jpa.repository.Query;

public interface ProjectDocumentRepository extends CustomRepository<ProjectDocument> {


    @Query(value = "select count(*) + 1 from "
        + ProjectDocument.KEY
        + " where project_id = ?1 and type = ?2",
        nativeQuery = true
    )
    Long findNextSeq(Long projectId, String type);

    List<ProjectDocument> findByProject_IdOrderByCode(Long projectId);

    List<ProjectDocument> findByProject_IdAndTypeOrderByCode(Long projectId, ProjectDocumentType type);
}
