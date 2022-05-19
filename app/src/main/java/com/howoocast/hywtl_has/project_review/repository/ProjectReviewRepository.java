package com.howoocast.hywtl_has.project_review.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_review.domain.ProjectReview;
import java.util.List;
import java.util.Optional;

public interface ProjectReviewRepository extends CustomRepository<ProjectReview> {

    List<ProjectReview> findByProject_Id(Long projectId);

    Optional<ProjectReview> findByCode(String code);

}
