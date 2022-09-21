package com.howoocast.hywtl_has.project_estimate.controller;

import com.howoocast.hywtl_has.project_estimate.parameter.ProjectEstimateConfirmParameter;
import com.howoocast.hywtl_has.project_estimate.service.ProjectEstimateService;
import com.howoocast.hywtl_has.project_estimate.view.ProjectEstimateShortView;
import com.howoocast.hywtl_has.project_estimate.view.ProjectEstimateView;
import java.util.List;
import java.util.Optional;
import javax.annotation.Nullable;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class ProjectEstimateController {


    private final ProjectEstimateService service;

    @GetMapping("/project/sales/{projectId}/estimate")
    public List<ProjectEstimateShortView> list(
        @PathVariable Long projectId
    ) {
        return ProjectEstimateMapper.toShortView(
            service.getList(projectId)
        );
    }

    @GetMapping("/project/sales/{projectId}/basic/estimate")
    public @Nullable
    ProjectEstimateView getFinal(
        @PathVariable Long projectId
    ) {
        return Optional.ofNullable(service.getFinal(projectId))
            .map(ProjectEstimateView::assemble)
            .orElse(null);
    }


    @PostMapping("/project/sales/{projectId}/estimate/confirmed")
    public void setConfirmed(
        @PathVariable Long projectId,
        @Valid @RequestBody ProjectEstimateConfirmParameter parameter
    ) {
        service.confirm(
            projectId,
            parameter.getEstimateId()
        );
    }

}
