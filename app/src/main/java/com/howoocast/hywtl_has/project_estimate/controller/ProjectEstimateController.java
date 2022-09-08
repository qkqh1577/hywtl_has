package com.howoocast.hywtl_has.project_estimate.controller;

import com.howoocast.hywtl_has.common.util.UsernameExtractor;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectCustomEstimateAddParameter;
import com.howoocast.hywtl_has.project_estimate.service.ProjectEstimateService;
import com.howoocast.hywtl_has.project_estimate.view.ProjectEstimateShortView;
import com.howoocast.hywtl_has.project_estimate.view.ProjectEstimateView;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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

    @GetMapping("/project/sales/custom-estimate/{id}")
    public ProjectEstimateView get(
        @PathVariable Long id
    ) {
        return ProjectEstimateMapper.toView(
            service.getCustom(id)
        );
    }

    @PostMapping("/project/sales/{projectId}/custom-estimate")
    public void addCustom(
        @PathVariable Long projectId,
        Authentication authentication,
        @Valid @ModelAttribute ProjectCustomEstimateAddParameter parameter
    ) {
        String username = UsernameExtractor.get(authentication);
        service.addCustom(projectId, username, parameter);
    }

    @PostMapping("/project/sales/estimate/{id}/confirmed")
    public void setConfirmed(
        @PathVariable Long id
    ) {

    }
}
