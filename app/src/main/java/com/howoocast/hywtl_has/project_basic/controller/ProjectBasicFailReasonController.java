package com.howoocast.hywtl_has.project_basic.controller;

import com.howoocast.hywtl_has.project_basic.parameter.ProjectBasicFailReasonAddParameter;
import com.howoocast.hywtl_has.project_basic.parameter.ProjectBasicFailReasonUpdateParameter;
import com.howoocast.hywtl_has.project_basic.service.ProjectBasicFailReasonService;
import com.howoocast.hywtl_has.project_basic.view.ProjectBasicFailReasonView;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
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
public class ProjectBasicFailReasonController {

    private final ProjectBasicFailReasonService service;


    @GetMapping("/project/sales/{id}/basic/fail-reason")
    public ProjectBasicFailReasonView get(
        @PathVariable Long id
    ) {
        return ProjectBasicFailReasonView.assemble(service.get(id));
    }

    @PostMapping("/project/sales/{id}/basic/fail-reason")
    public void add(
        @PathVariable Long id,
        @Valid @RequestBody ProjectBasicFailReasonAddParameter parameter
    ) {
        service.add(id, parameter);
    }

    @PatchMapping("/project/sales/{id}/basic/fail-reason")
    public void updateFailReason(
        @PathVariable Long id,
        @RequestBody ProjectBasicFailReasonUpdateParameter parameter
    ) {
        service.update(id, parameter);
    }
}
