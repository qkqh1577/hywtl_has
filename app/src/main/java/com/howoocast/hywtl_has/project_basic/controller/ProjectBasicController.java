package com.howoocast.hywtl_has.project_basic.controller;

import com.howoocast.hywtl_has.project_basic.parameter.ProjectBasicBusinessAddParameter;
import com.howoocast.hywtl_has.project_basic.service.ProjectBasicService;
import com.howoocast.hywtl_has.project_basic.view.ProjectBasicBusinessView;
import com.howoocast.hywtl_has.project_basic.view.ProjectBasicDesignView;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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

    @GetMapping("/project/sales/{id}/basic/design")
    public ProjectBasicDesignView design(
        @PathVariable Long id
    ) {
        return ProjectBasicMapper.toView(
            service.getDesign(id)
        );
    }

    @PostMapping("/project/sales/{id}/basic/business")
    public void addBusiness(
        @PathVariable Long id,
        @Valid @RequestBody ProjectBasicBusinessAddParameter parameter
    ) {
        service.pushBusiness(id, parameter);
    }


    @DeleteMapping("/project/sales/basic/business/{projectBasicBusinessId}")
    public void deleteBusiness(
        @PathVariable Long projectBasicBusinessId
    ) {
        service.deleteBusiness(projectBasicBusinessId);
    }


}
