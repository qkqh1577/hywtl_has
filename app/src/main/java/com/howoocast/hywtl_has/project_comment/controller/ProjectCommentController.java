package com.howoocast.hywtl_has.project_comment.controller;

import com.howoocast.hywtl_has.project_comment.parameter.ProjectCommentAddParameter;
import com.howoocast.hywtl_has.project_comment.parameter.ProjectCommentPredicateBuilder;
import com.howoocast.hywtl_has.project_comment.service.ProjectCommentService;
import com.howoocast.hywtl_has.project_comment.view.ProjectCommentView;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class ProjectCommentController {

    private final ProjectCommentService projectCommentService;

    @GetMapping("/project-comments")
    public Page<ProjectCommentView> page(
        @RequestParam Long projectId,
        @RequestParam(required = false) String keyword,
        @PageableDefault(sort = "id", direction = Direction.DESC) Pageable pageable
    ) {
        return projectCommentService.page(
            new ProjectCommentPredicateBuilder()
                .projectId(projectId)
                .keyword(keyword)
                .build(),
            pageable
        );
    }

    @PostMapping("/project-comments")
    public ProjectCommentView add(
        Authentication authentication,
        @Valid @RequestBody ProjectCommentAddParameter params) {
        return projectCommentService.add(
            authentication.getName(),
            params
        );
    }
}
