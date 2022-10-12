package com.howoocast.hywtl_has.project_estimate.controller;

import com.howoocast.hywtl_has.common.util.UsernameExtractor;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectCustomEstimateAddParameter;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectCustomEstimateChangeParameter;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectCustomEstimateExtensionParameter;
import com.howoocast.hywtl_has.project_estimate.service.ProjectCustomEstimateService;
import com.howoocast.hywtl_has.project_estimate.view.ProjectCustomEstimateView;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class ProjectCustomEstimateController {


    private final ProjectCustomEstimateService service;

    @GetMapping("/project/sales/custom-estimate/{id}")
    public ProjectCustomEstimateView get(
        @PathVariable Long id
    ) {
        return ProjectCustomEstimateView.assemble(service.get(id));
    }

    @PostMapping("/project/sales/{projectId}/custom-estimate")
    public void add(
        @PathVariable Long projectId,
        Authentication authentication,
        @Valid @ModelAttribute ProjectCustomEstimateAddParameter parameter
    ) {
        String username = UsernameExtractor.get(authentication);
        service.add(projectId, username, parameter);
    }

    @PutMapping("/project/sales/custom-estimate/{id}")
    public void change(
        @PathVariable Long id,
        @Valid @RequestBody ProjectCustomEstimateChangeParameter parameter
    ) {
        service.change(id, parameter);
    }

    @PutMapping("/project/sales/custom-estimate/{id}/extension")
    public void extend(
        @PathVariable Long id,
        @Valid @RequestBody ProjectCustomEstimateExtensionParameter parameter
    ) {
        service.extend(id, parameter);
    }

    @DeleteMapping("/project/sales/custom-estimate/{id}")
    public void delete(
        @PathVariable Long id
    ) {
        service.delete(id);
    }
}
