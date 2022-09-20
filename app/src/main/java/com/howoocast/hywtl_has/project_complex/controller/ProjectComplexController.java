package com.howoocast.hywtl_has.project_complex.controller;

import com.howoocast.hywtl_has.project_complex.parameter.ProjectComplexBuildingParameter;
import com.howoocast.hywtl_has.project_complex.parameter.ProjectComplexSiteParameter;
import com.howoocast.hywtl_has.project_complex.service.ProjectComplexService;
import com.howoocast.hywtl_has.project_complex.view.ProjectBasicTestView;
import com.howoocast.hywtl_has.project_complex.view.ProjectComplexBuildingView;
import com.howoocast.hywtl_has.project_complex.view.ProjectComplexSiteView;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
public class ProjectComplexController {

    private final ProjectComplexService service;

    @GetMapping("/project/sales/{id}/basic/test")
    public ProjectBasicTestView test(
        @PathVariable Long id
    ) {
        return ProjectBasicTestView.assemble(
            service.getSiteList(id),
            service.getBuildingList(id)
        );
    }

    @GetMapping("/project/sales/{id}/complex/site")
    public List<ProjectComplexSiteView> siteList(
        @PathVariable Long id
    ) {
        return ProjectComplexMapper.toSite(
            service.getSiteList(id)
        );
    }

    @GetMapping("/project/sales/{id}/complex/building")
    public List<ProjectComplexBuildingView> buildingList(
        @PathVariable Long id
    ) {
        return ProjectComplexMapper.toBuilding(
            service.getBuildingList(id)
        );
    }

    @GetMapping("/project/sales/complex/building/{id}")
    public ProjectComplexBuildingView building(
        @PathVariable Long id
    ) {
        return ProjectComplexMapper.toView(
            service.getBuilding(id)
        );
    }

    @PutMapping("/project/sales/{projectId}/complex/site")
    public void pushSite(
        @PathVariable Long projectId
    ) {
        service.pushSite(projectId);
    }

    @PutMapping("/project/sales/complex/site/{id}")
    public void updateSite(
        @PathVariable Long id,
        @RequestBody ProjectComplexSiteParameter parameter
    ) {
        service.updateSite(id, parameter);
    }

    @PutMapping("/project/sales/{projectId}/complex/building")
    public void pushBuilding(
        @PathVariable Long projectId
    ) {
        service.pushBuilding(projectId);
    }

    @PutMapping("/project/sales/complex/building/{id}")
    public void updateBuilding(
        @PathVariable Long id,
        @RequestBody ProjectComplexBuildingParameter parameter
    ) {
        service.updateBuilding(id, parameter);
    }

    @DeleteMapping("/project/sales/complex/site/{id}")
    public void deleteSite(
        @PathVariable Long id
    ) {
        service.deleteSite(id);
    }

    @DeleteMapping("/project/sales/complex/building/{id}")
    public void deleteBuilding(
        @PathVariable Long id
    ) {
        service.deleteBuilding(id);
    }
}
