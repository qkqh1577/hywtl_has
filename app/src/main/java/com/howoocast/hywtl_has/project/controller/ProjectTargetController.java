package com.howoocast.hywtl_has.project.controller;

import com.howoocast.hywtl_has.project.parameter.ProjectTargetDocumentAddParameter;
import com.howoocast.hywtl_has.project.parameter.ProjectTargetDocumentChangeParameter;
import com.howoocast.hywtl_has.project.parameter.ProjectTargetParameter;
import com.howoocast.hywtl_has.project.service.ProjectTargetService;
import com.howoocast.hywtl_has.project.view.ProjectTargetDocumentView;
import com.howoocast.hywtl_has.project.view.ProjectTargetView;
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

    @PutMapping("/projects/{projectId}/target")
    public ProjectTargetView update(
        @PathVariable Long projectId,
        @Valid @RequestBody ProjectTargetParameter params
    ) {
        projectTargetService.update(projectId, params);
        return projectTargetService.getOne(projectId);
    }

    @GetMapping("/projects/{projectId}/target/documents")
    public List<ProjectTargetDocumentView> getDocumentList(@PathVariable Long projectId) {
        return projectTargetService.getDocumentList(projectId);
    }

    @GetMapping("/project/target/documents/{documentId}")
    public ProjectTargetDocumentView getDocument(@PathVariable Long documentId) {
        return projectTargetService.getDocument(documentId);
    }

    @PostMapping("/projects/{projectId}/target/documents")
    public ProjectTargetDocumentView addDocument(
        @PathVariable Long projectId,
        Authentication authentication,
        @Valid @ModelAttribute ProjectTargetDocumentAddParameter params
    ) {
        return projectTargetService.addDocument(projectId, authentication.getName(), params);
    }

    @PatchMapping("/project/target/documents/{documentId}")
    public ProjectTargetDocumentView changeDocument(
        @PathVariable Long documentId,
        @Valid @RequestBody ProjectTargetDocumentChangeParameter params
    ) {
        projectTargetService.updateDocument(documentId, params);
        return projectTargetService.getDocument(documentId);
    }

    @DeleteMapping("/project/target/documents/{documentId}")
    public void deleteDocument(@PathVariable Long documentId) {
        projectTargetService.deleteDocument(documentId);
    }
}
