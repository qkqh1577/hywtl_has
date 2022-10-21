package com.howoocast.hywtl_has.project_basic.controller;

import com.howoocast.hywtl_has.project_basic.parameter.ProjectBasicBusinessParameter;
import com.howoocast.hywtl_has.project_basic.parameter.ProjectBasicDesignParameter;
import com.howoocast.hywtl_has.project_basic.parameter.ProjectBasicFailReasonAddParameter;
import com.howoocast.hywtl_has.project_basic.parameter.ProjectBasicFailReasonUpdateParameter;
import com.howoocast.hywtl_has.project_basic.service.ProjectBasicService;
import com.howoocast.hywtl_has.project_basic.view.ProjectBasicBusinessView;
import com.howoocast.hywtl_has.project_basic.view.ProjectBasicDesignView;
import com.howoocast.hywtl_has.project_basic.view.ProjectBasicFailReasonView;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ProjectBasicController {

    private final ProjectBasicService service;

    @GetMapping("/project/sales/{id}/basic/business")
    public List<ProjectBasicBusinessView> businessList(
        @PathVariable Long id
    ) {
        return ProjectBasicMapper.toBusinessView(
            service.getBusinessList(id)
        );
    }

    @GetMapping("/project/sales/basic/business/{id}")
    public ProjectBasicBusinessView business(
        @PathVariable Long id
    ) {
        return ProjectBasicMapper.toView(
            service.getBusiness(id)
        );
    }

    @GetMapping("/project/sales/{id}/basic/design")
    public ProjectBasicDesignView design(
        @PathVariable Long id
    ) {
        return ProjectBasicMapper.toView(
            service.getDesign(id)
        );
    }

    @GetMapping("/project/sales/{id}/basic/fail-reason")
    public ProjectBasicFailReasonView getFailReason(
        @PathVariable Long id
    ) {
        return ProjectBasicFailReasonView.assemble(service.getFailReason(id));
    }

    @PutMapping("/project/sales/{id}/basic/business")
    public void addBusiness(
        @PathVariable Long id,
        @Valid @RequestBody ProjectBasicBusinessParameter parameter
    ) {
        service.addBusiness(id, parameter);
    }

    @PutMapping("/project/sales/basic/business/{id}")
    public void changeBusiness(
        @PathVariable Long id,
        @Valid @RequestBody ProjectBasicBusinessParameter parameter
    ) {
        service.changeBusiness(id, parameter);
    }

    @PostMapping("/project/sales/{id}/basic/fail-reason")
    public void addFailReason(
        @PathVariable Long id,
        @Valid @RequestBody ProjectBasicFailReasonAddParameter parameter
    ) {
        service.addFailReason(id, parameter);
    }

    @PatchMapping("/project/sales/{id}/basic/design")
    public void updateDesign(
        @PathVariable Long id,
        @Valid @RequestBody ProjectBasicDesignParameter parameter
    ) {
        service.updateDesign(id, parameter);
    }

    @PatchMapping("/project/sales/{id}/basic/fail-reason")
    public void updateFailReason(
        @PathVariable Long id,
        @RequestBody ProjectBasicFailReasonUpdateParameter parameter
    ) {
        service.updateFailReason(id, parameter);
    }


    @DeleteMapping("/project/sales/basic/business/{projectBasicBusinessId}")
    public void deleteBusiness(
        @PathVariable Long projectBasicBusinessId
    ) {
        service.deleteBusiness(projectBasicBusinessId);
    }

}
