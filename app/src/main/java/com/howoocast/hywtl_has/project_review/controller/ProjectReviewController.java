package com.howoocast.hywtl_has.project_review.controller;

import com.howoocast.hywtl_has.project_review.parameter.ProjectReviewParameter;
import com.howoocast.hywtl_has.project_review.view.ProjectReviewShortView;
import com.howoocast.hywtl_has.project_review.service.ProjectReviewService;
import com.howoocast.hywtl_has.project_review.view.ProjectReviewView;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class ProjectReviewController {

    private final ProjectReviewService projectReviewService;

    @GetMapping("/projects/{projectId}/reviews")
    public List<ProjectReviewShortView> getList(@PathVariable Long projectId) {
        return projectReviewService.getList(projectId);
    }

    @GetMapping("/project/reviews/{id}")
    public ProjectReviewView getOne(@PathVariable Long id) {
        return projectReviewService.getOne(id);
    }

    @PostMapping("/projects/{projectId}/reviews")
    public ProjectReviewView add(
        @PathVariable Long projectId,
        Authentication authentication,
        @Valid @ModelAttribute ProjectReviewParameter parameter
    ) {
        return projectReviewService.add(projectId, authentication.getName(), parameter);
    }

    @PatchMapping("/project/reviews/{id}")
    public ProjectReviewView change(
        @PathVariable Long id,
        @Valid @ModelAttribute ProjectReviewParameter parameter
    ) {
        projectReviewService.change(id, parameter);
        return projectReviewService.getOne(id);
    }

    @DeleteMapping("/project/reviews/{id}")
    public void delete(@PathVariable Long id) {
        projectReviewService.delete(id);
    }
}
