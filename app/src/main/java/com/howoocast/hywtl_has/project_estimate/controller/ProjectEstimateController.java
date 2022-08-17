package com.howoocast.hywtl_has.project_estimate.controller;

import com.howoocast.hywtl_has.project_estimate.parameter.ProjectEstimateParameter;
import com.howoocast.hywtl_has.project_estimate.service.ProjectEstimateService;
import com.howoocast.hywtl_has.project_estimate.view.ProjectEstimateView;
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
public class ProjectEstimateController {

    private final ProjectEstimateService projectEstimateService;

    @GetMapping("/projects/{id}/estimate")
    public ProjectEstimateView getOne(@PathVariable Long id) {
        return projectEstimateService.getOne(id);
    }

    @PutMapping("/projects/{id}/estimate")
    public ProjectEstimateView upsert(
        @PathVariable Long id,
        @Valid @RequestBody ProjectEstimateParameter parameter
    ) {
        projectEstimateService.upsert(id, parameter);
        return projectEstimateService.getOne(id);
    }
}
