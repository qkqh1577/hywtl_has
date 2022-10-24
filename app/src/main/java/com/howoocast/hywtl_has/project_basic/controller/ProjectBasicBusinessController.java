package com.howoocast.hywtl_has.project_basic.controller;

import com.howoocast.hywtl_has.project_basic.parameter.ProjectBasicBusinessParameter;
import com.howoocast.hywtl_has.project_basic.service.ProjectBasicBusinessService;
import com.howoocast.hywtl_has.project_basic.view.ProjectBasicBusinessView;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;
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
public class ProjectBasicBusinessController {

    private final ProjectBasicBusinessService service;


    @GetMapping("/project/sales/{id}/basic/business")
    public List<ProjectBasicBusinessView> businessList(
        @PathVariable Long id
    ) {
        return service.getList(id).stream()
            .map(ProjectBasicBusinessView::assemble)
            .collect(Collectors.toList());
    }

    @GetMapping("/project/sales/basic/business/{id}")
    public ProjectBasicBusinessView get(
        @PathVariable Long id
    ) {
        return ProjectBasicBusinessView.assemble(
            service.get(id)
        );
    }

    @PutMapping("/project/sales/{id}/basic/business")
    public void addBusiness(
        @PathVariable Long id,
        @Valid @RequestBody ProjectBasicBusinessParameter parameter
    ) {
        service.add(id, parameter);
    }

    @PutMapping("/project/sales/basic/business/{id}")
    public void changeBusiness(
        @PathVariable Long id,
        @Valid @RequestBody ProjectBasicBusinessParameter parameter
    ) {
        service.change(id, parameter);
    }

    @DeleteMapping("/project/sales/basic/business/{projectBasicBusinessId}")
    public void deleteBusiness(
        @PathVariable Long projectBasicBusinessId
    ) {
        service.delete(projectBasicBusinessId);
    }
}
