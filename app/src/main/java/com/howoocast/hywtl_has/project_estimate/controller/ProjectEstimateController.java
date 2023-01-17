package com.howoocast.hywtl_has.project_estimate.controller;

import com.howoocast.hywtl_has.project_estimate.parameter.ProjectEstimateConfirmParameter;
import com.howoocast.hywtl_has.project_estimate.service.ProjectEstimateService;
import com.howoocast.hywtl_has.project_estimate.view.ProjectEstimateShortView;
import com.howoocast.hywtl_has.project_estimate.view.ProjectEstimateView;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletResponse;
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

    @GetMapping("/project/sales/estimate/{id}")
    public ProjectEstimateView get(
        @PathVariable Long id
    ) {
        return ProjectEstimateView.assemble(service.get(id));
    }

    @GetMapping("/project/sales/{projectId}/estimate")
    public List<ProjectEstimateShortView> list(
        @PathVariable Long projectId
    ) {
        return ProjectEstimateMapper.toShortView(
            service.getList(projectId)
        );
    }

    @GetMapping("/project/sales/{projectId}/basic/estimate")
    public List<ProjectEstimateView> getFinal(
        @PathVariable Long projectId
    ) {
        return Objects.requireNonNull(service.getFinal(projectId)).stream().map(ProjectEstimateView::assemble).collect(Collectors.toList());
    }

    @PostMapping("/project/sales/{projectId}/estimate/confirmed")
    public void setConfirmed(
        @PathVariable Long projectId,
        @Valid @RequestBody ProjectEstimateConfirmParameter parameter
    ) {
        service.confirm(
            projectId,
            parameter
        );
    }

    @GetMapping("/project/sales/estimate/{id}/file")
    public void download(
        @PathVariable Long id,
        HttpServletResponse response
    ) {
        service.getFile(id).download(response);
    }
}
