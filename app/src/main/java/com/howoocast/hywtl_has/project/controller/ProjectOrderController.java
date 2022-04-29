package com.howoocast.hywtl_has.project.controller;

import com.howoocast.hywtl_has.project.parameter.ProjectOrderParameter;
import com.howoocast.hywtl_has.project.service.ProjectOrderService;
import com.howoocast.hywtl_has.project.view.ProjectOrderView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class ProjectOrderController {

    private final ProjectOrderService projectOrderService;

    @GetMapping("/projects/{projectId}/order")
    public ProjectOrderView getOne(@PathVariable Long projectId) {
        return projectOrderService.getOne(projectId);
    }

    @PutMapping("/projects/{projectId}/order")
    public ProjectOrderView update(@PathVariable Long projectId, ProjectOrderParameter params) {
        projectOrderService.update(projectId, params);
        return projectOrderService.getOne(projectId);
    }
}
