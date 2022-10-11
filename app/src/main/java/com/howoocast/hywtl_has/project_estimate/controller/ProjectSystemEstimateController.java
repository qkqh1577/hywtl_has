package com.howoocast.hywtl_has.project_estimate.controller;

import com.howoocast.hywtl_has.common.util.UsernameExtractor;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectSystemEstimateParameter;
import com.howoocast.hywtl_has.project_estimate.service.ProjectSystemEstimateService;
import com.howoocast.hywtl_has.project_estimate.view.ProjectSystemEstimateView;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class ProjectSystemEstimateController {

    private final ProjectSystemEstimateService service;

    @GetMapping("/project/sales/system-estimate/{id}")
    public ProjectSystemEstimateView get(
        @PathVariable Long id
    ) {
        return ProjectSystemEstimateView.assemble(service.get(id));
    }

    @PutMapping("/project/sales/{projectId}/system-estimate")
    public void add(
        @PathVariable Long projectId,
        Authentication authentication,
        @Valid @RequestBody ProjectSystemEstimateParameter parameter
    ) {
        service.add(
            projectId,
            UsernameExtractor.get(authentication),
            parameter
        );
    }

    @PutMapping("/project/sales/system-estimate/{id}")
    public void change(
        @PathVariable Long id,
        @Valid @RequestBody ProjectSystemEstimateParameter parameter
    ) {
        service.change(id, parameter);
    }

    @DeleteMapping("/project/sales/system-estimate/{id}")
    public void delete(
        @PathVariable Long id
    ) {
        service.delete(id);
    }

}
