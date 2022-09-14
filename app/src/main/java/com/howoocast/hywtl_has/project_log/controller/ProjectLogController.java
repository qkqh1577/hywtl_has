package com.howoocast.hywtl_has.project_log.controller;

import com.howoocast.hywtl_has.project_log.parameter.ProjectLogPredicateBuilder;
import com.howoocast.hywtl_has.project_log.service.ProjectLogService;
import com.howoocast.hywtl_has.project_log.view.ProjectLogView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class ProjectLogController {

    private final ProjectLogService service;

    @GetMapping("/project/sales/{projectId}/log")
    public Page<ProjectLogView> page(
        @PathVariable Long projectId,
        @RequestParam(required = false) String tabName,
        @RequestParam(required = false) String createdAt,
        @RequestParam(required = false) String keyword,
        Pageable pageable
    ) {
        return service.page(
            new ProjectLogPredicateBuilder()
                .searchProject(projectId)
                .keyword(keyword)
                .searchTabName(tabName)
                .searchCreatedAt(createdAt)
                .build(),
            pageable
        );
    }

}
