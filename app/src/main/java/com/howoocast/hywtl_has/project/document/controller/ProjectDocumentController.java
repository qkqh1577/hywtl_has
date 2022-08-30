package com.howoocast.hywtl_has.project.document.controller;

import com.howoocast.hywtl_has.common.util.UsernameExtractor;
import com.howoocast.hywtl_has.project.document.domain.ProjectDocumentType;
import com.howoocast.hywtl_has.project.document.parameter.ProjectDocumentAddParameter;
import com.howoocast.hywtl_has.project.document.parameter.ProjectDocumentChangeParameter;
import com.howoocast.hywtl_has.project.document.service.ProjectDocumentService;
import com.howoocast.hywtl_has.project.document.view.ProjectDocumentShortView;
import com.howoocast.hywtl_has.project.document.view.ProjectDocumentView;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class ProjectDocumentController {


    private final ProjectDocumentService service;

    @GetMapping("/project/sales/{projectId}/document")
    public List<ProjectDocumentShortView> list(
        @PathVariable Long projectId,
        @RequestParam(required = false) ProjectDocumentType type
    ) {
        return ProjectDocumentMapper.toShort(
            service.list(projectId, type)
        );
    }

    @GetMapping("/project/sales/document/{id}")
    public ProjectDocumentView get(
        @PathVariable Long id
    ) {
        return ProjectDocumentMapper.toView(
            service.get(id)
        );
    }

    @PostMapping("/project/sales/{projectId}/document")
    public void add(
        @PathVariable Long projectId,
        @Valid @ModelAttribute ProjectDocumentAddParameter parameter,
        Authentication authentication
    ) {
        service.add(projectId, UsernameExtractor.get(authentication), parameter);
    }

    @PatchMapping("/project/sales/document/{id}")
    public void change(
        @PathVariable Long id,
        @Valid @ModelAttribute ProjectDocumentChangeParameter parameter

    ) {
        service.change(id, parameter);
    }

    @DeleteMapping("/project/sales/document/{id}")
    public void delete(
        @PathVariable Long id
    ) {
        service.delete(id);
    }
}
