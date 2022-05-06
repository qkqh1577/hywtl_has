package com.howoocast.hywtl_has.project_target_review.controller;

import com.howoocast.hywtl_has.project_target_review.parameter.ProjectTargetReviewAddParameter;
import com.howoocast.hywtl_has.project_target_review.view.ProjectTargetReviewListView;
import com.howoocast.hywtl_has.project_target_review.service.ProjectTargetReviewService;
import com.howoocast.hywtl_has.project_target_review.view.ProjectTargetReviewView;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class ProjectTargetReviewController {

    private final ProjectTargetReviewService projectTargetReviewService;

    @GetMapping("/projects/{projectId}/target/reviews")
    public List<ProjectTargetReviewListView> getReviewList(@PathVariable Long projectId) {
        return projectTargetReviewService.getReviewList(projectId);
    }

    @GetMapping("/project/target/reviews/{id}")
    public ProjectTargetReviewView getOne(@PathVariable Long id) {
        return projectTargetReviewService.getOne(id);
    }

    @PostMapping("/projects/{projectId}/target/reviews")
    public List<ProjectTargetReviewListView> addReview(
        @PathVariable Long projectId,
        Authentication authentication,
        @Valid @RequestBody ProjectTargetReviewAddParameter params
    ) {
        projectTargetReviewService.addReview(projectId, authentication.getName(), params);
        return projectTargetReviewService.getReviewList(projectId);
    }

    @PostMapping("/project/target/reviews/{id}/confirm")
    public List<ProjectTargetReviewListView> projectTargetReviewService(@PathVariable Long id) {
        ProjectTargetReviewListView source = projectTargetReviewService.confirmReview(id);
        return projectTargetReviewService.getReviewList(source.getProjectId());
    }
}
