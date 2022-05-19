package com.howoocast.hywtl_has.project_target.controller;

import com.howoocast.hywtl_has.project_target.parameter.ProjectTargetParameter;
import com.howoocast.hywtl_has.project_target.service.ProjectTargetService;
import com.howoocast.hywtl_has.project_target.view.ProjectTargetView;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
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
public class ProjectTargetController {

    private final ProjectTargetService service;


    @GetMapping("/projects/{projectId}/targets")
    public List<ProjectTargetView> getList(@PathVariable Long projectId) {
        return service.getList(projectId);
    }

    @GetMapping("/project/targets/{id}")
    public ProjectTargetView getOne(@PathVariable Long id) {
        return service.get(id);
    }

    @PostMapping("/projects/{projectId}/targets")
    public ProjectTargetView add(
        @PathVariable Long projectId,
        Authentication authentication,
        @Valid @RequestBody ProjectTargetParameter params
    ) {
        return service.add(projectId, authentication.getName(), params);
    }

    @PatchMapping("/project/targets/{id}")
    public ProjectTargetView change(
        @PathVariable Long id,
        @Valid @RequestBody ProjectTargetParameter params
    ) {
        service.change(id, params);
        return service.get(id);
    }

    @DeleteMapping("/project/targets/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
