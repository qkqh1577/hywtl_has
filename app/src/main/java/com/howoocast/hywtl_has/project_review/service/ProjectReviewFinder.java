package com.howoocast.hywtl_has.project_review.service;

import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.project_review.domain.ProjectReview;
import com.howoocast.hywtl_has.project_review.repository.ProjectReviewRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ProjectReviewFinder extends CustomFinder<ProjectReview> {

    private final ProjectReviewRepository repository;

    protected ProjectReviewFinder(
        ProjectReviewRepository repository
    ) {
        super("project_review", repository);
        this.repository = repository;
    }

    public List<ProjectReview> findByProjectId(Long projectId) {
        return repository.findByProject_Id(projectId);
    }
}
