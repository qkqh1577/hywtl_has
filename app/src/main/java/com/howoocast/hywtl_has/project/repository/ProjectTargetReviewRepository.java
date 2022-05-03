package com.howoocast.hywtl_has.project.repository;

import com.howoocast.hywtl_has.project.domain.ProjectTargetReview;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectTargetReviewRepository extends JpaRepository<ProjectTargetReview, Long> {

    List<ProjectTargetReview> findByProject_IdAndDeletedTimeIsNull(Long projectId);

    Optional<ProjectTargetReview> findByProject_IdAndConfirmedIsTrueAndDeletedTimeIsNull(Long projectId);

    Optional<ProjectTargetReview> findByIdAndDeletedTimeIsNull(Long id);
}
