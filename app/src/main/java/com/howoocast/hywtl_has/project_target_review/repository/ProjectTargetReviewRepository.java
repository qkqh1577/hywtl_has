package com.howoocast.hywtl_has.project_target_review.repository;

import com.howoocast.hywtl_has.project_target_review.domain.ProjectTargetReview;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectTargetReviewRepository extends JpaRepository<ProjectTargetReview, Long> {

    List<ProjectTargetReview> findByProject_IdAndDeletedAtIsNull(Long projectId);

    Optional<ProjectTargetReview> findByProject_IdAndConfirmedIsTrueAndDeletedAtIsNull(Long projectId);

    Optional<ProjectTargetReview> findByIdAndDeletedAtIsNull(Long id);
}
