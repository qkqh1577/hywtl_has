package com.howoocast.hywtl_has.project.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project.domain.ProjectTargetDocument;
import java.util.List;

public interface ProjectTargetDocumentRepository extends CustomRepository<ProjectTargetDocument> {

    List<ProjectTargetDocument> findByProject_Id(Long projectId);

}