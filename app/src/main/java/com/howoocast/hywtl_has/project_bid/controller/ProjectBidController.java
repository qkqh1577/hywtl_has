package com.howoocast.hywtl_has.project_bid.controller;

import com.howoocast.hywtl_has.project_bid.parameter.ProjectBidParameter;
import com.howoocast.hywtl_has.project_bid.service.ProjectBidService;
import com.howoocast.hywtl_has.project_bid.view.ProjectBidView;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Valid
@RestController
@RequiredArgsConstructor
public class ProjectBidController {

    private final ProjectBidService service;

    @GetMapping("/project/sales/{projectId}/bid")
    public ProjectBidView get(
        @PathVariable Long projectId
    ) {
        return ProjectBidView.assemble(service.get(projectId));
    }

    @PatchMapping("/project/sales/{projectId}/bid")
    public void upsert(
        @PathVariable Long projectId,
        @Valid @RequestBody ProjectBidParameter parameter
    ) {
        service.upsert(projectId, parameter);
    }

}
