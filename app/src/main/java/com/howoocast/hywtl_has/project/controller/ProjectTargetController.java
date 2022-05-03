package com.howoocast.hywtl_has.project.controller;

import com.howoocast.hywtl_has.project.parameter.ProjectTargetDocumentAddParameter;
import com.howoocast.hywtl_has.project.parameter.ProjectTargetDocumentChangeParameter;
import com.howoocast.hywtl_has.project.parameter.ProjectTargetParameter;
import com.howoocast.hywtl_has.project.parameter.ProjectTargetReviewAddParameter;
import com.howoocast.hywtl_has.project.service.ProjectTargetService;
import com.howoocast.hywtl_has.project.view.ProjectTargetDocumentView;
import com.howoocast.hywtl_has.project.view.ProjectTargetReviewView;
import com.howoocast.hywtl_has.project.view.ProjectTargetView;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class ProjectTargetController {

    private final ProjectTargetService projectTargetService;

    @GetMapping("/projects/{projectId}/target")
    public ProjectTargetView getOne(@PathVariable Long projectId) {
        return projectTargetService.getOne(projectId);
    }

    @GetMapping("/projects/{projectId}/target/reviews")
    public List<ProjectTargetReviewView> getReviewList(@PathVariable Long projectId) {
        return projectTargetService.getReviewList(projectId);
    }

    @GetMapping("/projects/{projectId}/target/documents")
    public List<ProjectTargetDocumentView> getDocumentList(@PathVariable Long projectId) {
        return projectTargetService.getDocumentList(projectId);
    }

    @PostMapping("/projects/{projectId}/target/reviews")
    public List<ProjectTargetReviewView> addReview(
        @PathVariable Long projectId,
        Authentication authentication,
        @Valid @RequestBody ProjectTargetReviewAddParameter params
    ) {
        projectTargetService.addReview(projectId, authentication.getName(), params);
        return projectTargetService.getReviewList(projectId);
    }

    @PostMapping("/projects/{projectId}/target/documents")
    public List<ProjectTargetDocumentView> addDocument(
        @PathVariable Long projectId,
        Authentication authentication,
        @Valid @RequestBody ProjectTargetDocumentAddParameter params
    ) {
        projectTargetService.addDocument(projectId, authentication.getName(), params);
        return projectTargetService.getDocumentList(projectId);
    }

    @PostMapping("/project/target/reviews/{id}/confirm")
    public List<ProjectTargetReviewView> confirmReview(@PathVariable Long id) {
        ProjectTargetReviewView source = projectTargetService.confirmReview(id);
        return projectTargetService.getReviewList(source.getProjectId());
    }

    @PutMapping("/projects/{projectId}/target")
    public ProjectTargetView update(
        @PathVariable Long projectId,
        @Valid @RequestBody ProjectTargetParameter params
    ) {
        projectTargetService.update(projectId, params);
        return projectTargetService.getOne(projectId);
    }

    @PatchMapping("/project/target/documents/{id}")
    public List<ProjectTargetDocumentView> changeDocument(
        @PathVariable Long id,
        @Valid @RequestBody ProjectTargetDocumentChangeParameter params
    ) {
        ProjectTargetDocumentView source = projectTargetService.updateDocument(id, params);
        return projectTargetService.getDocumentList(source.getProjectId());
    }
}
