package com.howoocast.hywtl_has.project_collection.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollection;
import java.util.List;

public interface ProjectCollectionRepository extends CustomRepository<ProjectCollection> {

    List<ProjectCollection> findByProject_Id(Long projectId);
}
