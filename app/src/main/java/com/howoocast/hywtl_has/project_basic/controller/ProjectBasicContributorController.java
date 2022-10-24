package com.howoocast.hywtl_has.project_basic.controller;

import com.howoocast.hywtl_has.project_basic.parameter.ProjectBasicExternalContributorParameter;
import com.howoocast.hywtl_has.project_basic.parameter.ProjectBasicInternalContributorParameter;
import com.howoocast.hywtl_has.project_basic.service.ProjectBasicContributorService;
import com.howoocast.hywtl_has.project_basic.view.ProjectBasicExternalContributorView;
import com.howoocast.hywtl_has.project_basic.view.ProjectBasicInternalContributorView;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class ProjectBasicContributorController {

    private final ProjectBasicContributorService service;

    @GetMapping("/project/sales/{projectId}/basic/contributor/internal")
    public List<ProjectBasicInternalContributorView> getInternalList(
        @PathVariable Long projectId
    ) {
        return service.getInternalList(projectId).stream()
            .map(ProjectBasicInternalContributorView::assemble)
            .collect(Collectors.toList());
    }


    @GetMapping("/project/sales/{projectId}/basic/contributor/external")
    public List<ProjectBasicExternalContributorView> getExternalList(
        @PathVariable Long projectId
    ) {
        return service.getExternalList(projectId).stream()
            .map(ProjectBasicExternalContributorView::assemble)
            .collect(Collectors.toList());
    }

    @PostMapping("/project/sales/{projectId}/basic/contributor/internal")
    public void pushInternal(
        @PathVariable Long projectId
    ) {
        service.addInternal(projectId);
    }

    @PostMapping("/project/sales/{projectId}/basic/contributor/external")
    public void pushExternal(
        @PathVariable Long projectId
    ) {
        service.addExternal(projectId);
    }

    @PatchMapping("/project/sales/basic/contributor/internal/{id}")
    public void updateInternal(
        @PathVariable Long id,
        @Valid @RequestBody ProjectBasicInternalContributorParameter parameter
    ) {
        service.updateInternal(id, parameter);
    }

    @PatchMapping("/project/sales/basic/contributor/external/{id}")
    public void updateExternal(
        @PathVariable Long id,
        @Valid @RequestBody ProjectBasicExternalContributorParameter parameter
    ) {
        service.updateExternal(id, parameter);
    }

    @DeleteMapping("/project/sales/basic/contributor/internal/{id}")
    public void deleteInternal(
        @PathVariable Long id
    ) {
        service.deleteInternal(id);
    }

    @DeleteMapping("/project/sales/basic/contributor/external/{id}")
    public void deleteExternal(
        @PathVariable Long id
    ) {
        service.deleteExternal(id);
    }
}
