package com.howoocast.hywtl_has.project_collection.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollection;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStage;
import org.springframework.data.jpa.repository.Query;

public interface ProjectCollectionStageRepository extends CustomRepository<ProjectCollectionStage> {

    @Query(value = "select "
        + " max(s.seq) + 1 "
        + " from "
        + ProjectCollectionStage.KEY
        + " as s "
        + " join "
        + ProjectCollection.KEY
        + " as c "
        + " on c.id = s.project_collection_id "
        + " where "
        + " c.project_id = ?1 "
        , nativeQuery = true)
    Integer findNextSeq(Long projectId);
}
