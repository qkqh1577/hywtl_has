package com.howoocast.hywtl_has.project_estimate.controller;

import com.howoocast.hywtl_has.project_estimate.parameter.ProjectFinalEstimateParameter;
import com.howoocast.hywtl_has.project_estimate.service.ProjectFinalEstimateService;
import com.howoocast.hywtl_has.project_estimate.view.ProjectFinalShortView;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequiredArgsConstructor
public class ProjectFinalEstimateController {

    private final ProjectFinalEstimateService service;

    @GetMapping("/project/sales/{projectId}/estimate/final")
    public ProjectFinalShortView finalEstimate(
        @PathVariable Long projectId
    ) {
        return ProjectFinalShortView.assemble(
            service.getFinalEstimate(projectId)
        );
    }

    @GetMapping("/project/sales/{projectId}/basic/estimate/final")
    public ProjectFinalShortView getFinal(
        @PathVariable Long projectId
    ) {
        return ProjectFinalShortView.assemble(service.getFinalEstimate(projectId));
    }

    @PatchMapping("/project/sales/{projectId}/estimate/final")
    public void updateFinalEstimate(
        @PathVariable Long projectId,
        @Valid @RequestBody ProjectFinalEstimateParameter parameter
    ) {
        service.updateFinalEstimate(projectId, parameter);
    }
}
