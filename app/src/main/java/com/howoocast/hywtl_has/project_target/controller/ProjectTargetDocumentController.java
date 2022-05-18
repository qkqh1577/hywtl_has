package com.howoocast.hywtl_has.project_target.controller;

import com.howoocast.hywtl_has.project_target.parameter.ProjectTargetDocumentAddParameter;
import com.howoocast.hywtl_has.project_target.parameter.ProjectTargetDocumentChangeParameter;
import com.howoocast.hywtl_has.project_target.service.ProjectTargetDocumentService;
import com.howoocast.hywtl_has.project_target.view.ProjectTargetDocumentView;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class ProjectTargetDocumentController {

    private final ProjectTargetDocumentService service;


    @GetMapping("/projects/{projectId}/target/documents")
    public List<ProjectTargetDocumentView> getList(@PathVariable Long projectId) {
        return service.getList(projectId);
    }

    @GetMapping("/project/target/documents/{id}")
    public ProjectTargetDocumentView getOne(@PathVariable Long id) {
        return service.get(id);
    }

    @PostMapping("/projects/{projectId}/target/documents")
    public ProjectTargetDocumentView addDocument(
        @PathVariable Long projectId,
        Authentication authentication,
        @Valid @ModelAttribute ProjectTargetDocumentAddParameter params
    ) {
        return service.add(projectId, authentication.getName(), params);
    }

    @PatchMapping("/project/target/documents/{id}")
    public ProjectTargetDocumentView change(
        @PathVariable Long id,
        @Valid @RequestBody ProjectTargetDocumentChangeParameter params
    ) {
        service.change(id, params);
        return service.get(id);
    }

    @DeleteMapping("/project/target/documents/{id}")
    public void deleteDocument(@PathVariable Long id) {
        service.delete(id);
    }
}
