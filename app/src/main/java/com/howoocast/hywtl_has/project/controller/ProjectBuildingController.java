package com.howoocast.hywtl_has.project.controller;

import com.howoocast.hywtl_has.project.parameter.ProjectBuildingParameter;
import com.howoocast.hywtl_has.project.service.ProjectBuildingService;
import com.howoocast.hywtl_has.project.view.ProjectBuildingView;
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
public class ProjectBuildingController {

    private final ProjectBuildingService projectBuildingService;

    @GetMapping("/projects/{projectId}/building")
    public ProjectBuildingView getOne(@PathVariable Long projectId) {
        return projectBuildingService.getOne(projectId);
    }

    @PutMapping("/projects/{projectId}/building")
    public ProjectBuildingView put(@PathVariable Long projectId, @Valid @RequestBody ProjectBuildingParameter params) {
        projectBuildingService.update(projectId, params);
        return projectBuildingService.getOne(projectId);
    }
}
