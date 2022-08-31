package com.howoocast.hywtl_has.project.document.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project.document.domain.ProjectDocument;
import com.howoocast.hywtl_has.project.document.domain.ProjectDocumentType;
import java.util.List;

public interface ProjectDocumentRepository extends CustomRepository<ProjectDocument> {


    List<ProjectDocument> findByProject_IdOrderByCode(Long projectId);

    List<ProjectDocument> findByProject_IdAndTypeOrderByCode(Long projectId, ProjectDocumentType type);
}
