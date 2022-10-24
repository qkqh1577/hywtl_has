package com.howoocast.hywtl_has.project_basic.controller;

import com.howoocast.hywtl_has.project_basic.parameter.ProjectBasicDesignParameter;
import com.howoocast.hywtl_has.project_basic.service.ProjectBasicDesignService;
import com.howoocast.hywtl_has.project_basic.view.ProjectBasicDesignView;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ProjectBasicDesignController {

    private final ProjectBasicDesignService service;

    @GetMapping("/project/sales/{id}/basic/design")
    public ProjectBasicDesignView design(
        @PathVariable Long id
    ) {
        return ProjectBasicDesignView.assemble(
            service.getDesign(id)
        );
    }

    @PatchMapping("/project/sales/{id}/basic/design")
    public void updateDesign(
        @PathVariable Long id,
        @Valid @RequestBody ProjectBasicDesignParameter parameter
    ) {
        service.updateDesign(id, parameter);
    }

}
