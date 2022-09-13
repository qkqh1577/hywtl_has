package com.howoocast.hywtl_has.project_log.controller;

import com.howoocast.hywtl_has.project_log.service.ProjectLogService;
import com.howoocast.hywtl_has.project_log.view.ProjectLogView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class ProjectLogController {

    private final ProjectLogService service;

    @GetMapping("/project/sales/{id}/log")
    public Page<ProjectLogView> page(
        @RequestParam(required = false) String keyword,
        Pageable pageable

        ) {
        return null;
    }
}
