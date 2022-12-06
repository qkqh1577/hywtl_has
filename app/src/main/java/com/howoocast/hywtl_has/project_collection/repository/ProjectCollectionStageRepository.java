package com.howoocast.hywtl_has.project_collection.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollection;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStage;
import java.util.List;
import org.springframework.data.jpa.repository.Query;

public interface ProjectCollectionStageRepository extends CustomRepository<ProjectCollectionStage> {

    List<ProjectCollectionStage> findByProjectCollection_Id(Long projectCollectionId);

    @Query(value = "select "
        + " ifnull(max(s.seq), 0) + 1 "
        + " from "
        + ProjectCollectionStage.KEY
        + " as s "
        + " join "
        + ProjectCollection.KEY
        + " as c "
        + " on c.id = s.project_collection_id "
        + " where "
        + " c.project_id = ?1 "
        + " and "
        + " s.deleted_at is null "
        , nativeQuery = true)
    Integer findNextSeq(Long projectId);
}
