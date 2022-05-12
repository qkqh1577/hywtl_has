package com.howoocast.hywtl_has.project_target_review.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_target_review.domain.ProjectTargetReview;
import java.util.List;
import java.util.Optional;

public interface ProjectTargetReviewRepository extends CustomRepository<ProjectTargetReview> {

    List<ProjectTargetReview> findByProject_Id(Long projectId);

    Optional<ProjectTargetReview> findByProject_IdAndConfirmedIsTrue(Long projectId);

}
