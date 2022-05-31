package com.howoocast.hywtl_has.project.controller;

import com.howoocast.hywtl_has.project.parameter.ProjectBasicParameter;
import com.howoocast.hywtl_has.project.parameter.ProjectPredicateBuilder;
import com.howoocast.hywtl_has.project.service.ProjectService;
import com.howoocast.hywtl_has.project.view.ProjectShortView;
import com.howoocast.hywtl_has.project.view.ProjectView;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping("/projects")
    public Page<ProjectShortView> page(
        @RequestParam(required = false) String keyword,
        Pageable pageable
    ) {
        return projectService.page(
            new ProjectPredicateBuilder()
                .keyword(keyword)
                .build(),
            pageable
        );
    }

    @GetMapping("/projects/{id}")
    public ProjectView getOne(@PathVariable Long id) {
        return projectService.getOne(id);
    }

    @PostMapping("/projects")
    public ProjectView add(@Valid @RequestBody ProjectBasicParameter params) {
        return projectService.add(params);
    }

}
