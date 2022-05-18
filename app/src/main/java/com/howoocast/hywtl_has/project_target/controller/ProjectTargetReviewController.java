package com.howoocast.hywtl_has.project_target.controller;

import com.howoocast.hywtl_has.project_target.parameter.ProjectTargetReviewParameter;
import com.howoocast.hywtl_has.project_target.view.ProjectTargetReviewListView;
import com.howoocast.hywtl_has.project_target.service.ProjectTargetReviewService;
import com.howoocast.hywtl_has.project_target.view.ProjectTargetReviewView;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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
    public List<ProjectTargetReviewListView> getList(@PathVariable Long projectId) {
        return projectTargetReviewService.getList(projectId);
    }

    @GetMapping("/project/target/reviews/{id}")
    public ProjectTargetReviewView getOne(@PathVariable Long id) {
        return projectTargetReviewService.getOne(id);
    }

    @PostMapping("/projects/{projectId}/target/reviews")
    public ProjectTargetReviewView add(
        @PathVariable Long projectId,
        Authentication authentication,
        @Valid @RequestBody ProjectTargetReviewParameter params
    ) {
        return projectTargetReviewService.add(projectId, authentication.getName(), params);
    }

    @PatchMapping("/project/target/reviews/{id}")
    public ProjectTargetReviewView change(
        @PathVariable Long id,
        @Valid @RequestBody ProjectTargetReviewParameter params
    ) {
        projectTargetReviewService.change(id, params);
        return projectTargetReviewService.getOne(id);
    }

    @DeleteMapping("/project/target/reviews/{id}")
    public void delete(@PathVariable Long id) {
        projectTargetReviewService.delete(id);
    }
}
