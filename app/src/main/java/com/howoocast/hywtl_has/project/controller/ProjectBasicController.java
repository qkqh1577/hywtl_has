package com.howoocast.hywtl_has.project.controller;

import com.howoocast.hywtl_has.project.parameter.ProjectBasicParameter;
import com.howoocast.hywtl_has.project.service.ProjectBasicService;
import com.howoocast.hywtl_has.project.view.ProjectBasicView;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class ProjectBasicController {

    private final ProjectBasicService projectBasicService;

    @GetMapping("/projects/{projectId}/basic")
    public ProjectBasicView getOne(@PathVariable Long projectId) {
        return projectBasicService.getOne(projectId);
    }

    @PutMapping("/projects/{projectId}/basic")
    public ProjectBasicView putBasic(
        @PathVariable Long projectId,
        @Valid @RequestBody ProjectBasicParameter params
    ) {
        projectBasicService.update(projectId, params);
        return projectBasicService.getOne(projectId);
    }
}
