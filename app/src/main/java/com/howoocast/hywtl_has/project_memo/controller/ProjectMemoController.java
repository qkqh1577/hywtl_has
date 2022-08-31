package com.howoocast.hywtl_has.project_memo.controller;

import com.howoocast.hywtl_has.common.util.UsernameExtractor;
import com.howoocast.hywtl_has.project_memo.domain.ProjectMemoCategory;
import com.howoocast.hywtl_has.project_memo.parameter.ProjectMemoParameter;
import com.howoocast.hywtl_has.project_memo.parameter.ProjectMemoPredicateBuilder;
import com.howoocast.hywtl_has.project_memo.service.ProjectMemoService;
import com.howoocast.hywtl_has.project_memo.view.ProjectMemoView;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
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
public class ProjectMemoController {

    private final ProjectMemoService service;

    @GetMapping("/project/sales/{projectId}/memo")
    public Page<ProjectMemoView> page(
        @PathVariable Long projectId,
        @RequestParam(required = false) String keyword,
        @RequestParam(required = false) ProjectMemoCategory category,
        @PageableDefault(sort = "createdAt", direction = Direction.DESC) Pageable pageable
    ) {
        return ProjectMemoMapper.toView(
            service.page(
                new ProjectMemoPredicateBuilder(
                    projectId,
                    keyword,
                    category
                )
                    .build(),
                pageable
            )
        );
    }

    @GetMapping("/project/sales/memo/{id}")
    public ProjectMemoView get(
        @PathVariable Long id
    ) {
        return ProjectMemoMapper.toView(
            service.one(id)
        );
    }

    @PostMapping("/project/sales/{projectId}/memo")
    public void add(
        Authentication authentication,
        @PathVariable Long projectId,
        @Valid @RequestBody ProjectMemoParameter parameter
    ) {

        service.add(
            UsernameExtractor.get(authentication),
            projectId,
            parameter
        );
    }

    @PatchMapping("/project/sales/memo/{id}")
    public void change(
        @PathVariable Long id,
        @Valid @RequestBody ProjectMemoParameter parameter
    ) {
        service.change(id, parameter);
    }

    @DeleteMapping("/project/sales/memo/{id}")
    public void delete(
        @PathVariable Long id
    ) {
        service.delete(id);
    }
}
