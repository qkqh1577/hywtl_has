package com.howoocast.hywtl_has.project.controller;

import com.howoocast.hywtl_has.common.util.UsernameExtractor;
import com.howoocast.hywtl_has.project.parameter.ProjectAddParameter;
import com.howoocast.hywtl_has.project.parameter.ProjectPredicateBuilder;
import com.howoocast.hywtl_has.project.parameter.ProjectStatusUpdateParameter;
import com.howoocast.hywtl_has.project.parameter.ProjectUpdateParameter;
import com.howoocast.hywtl_has.project.service.ProjectService;
import com.howoocast.hywtl_has.project.view.ProjectShortView;
import com.howoocast.hywtl_has.project.view.ProjectView;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService service;

    @GetMapping("/project/sales")
    public Page<ProjectShortView> page(
        @RequestParam(required = false) String keyword,
        Pageable pageable
    ) {
        return ProjectMapper.toShortView(
            service.page(
                new ProjectPredicateBuilder()
                    .keyword(keyword)
                    .build(),
                pageable
            ));
    }


    @GetMapping("/project/sales/{id}")
    public ProjectView getOne(@PathVariable Long id) {
        return ProjectMapper.toView(service.getOne(id));
    }

    @PostMapping("/project/sales")
    public void add(
        Authentication authentication,
        @Valid @RequestBody ProjectAddParameter parameter
    ) {
        service.add(parameter, UsernameExtractor.get(authentication));
    }


    @PatchMapping("/project/sales/{id}/basic")
    public void update(
        @PathVariable Long id,
        @Valid @RequestBody ProjectUpdateParameter parameter
    ) {
        service.update(id, parameter);
    }

    @PatchMapping("/project/sales/{id}/status")
    public void updateStatus(
        @PathVariable Long id,
        @Valid @RequestBody ProjectStatusUpdateParameter parameter
    ) {
        service.updateProjectStatus(id, parameter);
    }

}
