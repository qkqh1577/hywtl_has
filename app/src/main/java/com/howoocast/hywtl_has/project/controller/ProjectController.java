package com.howoocast.hywtl_has.project.controller;

import com.howoocast.hywtl_has.common.util.UsernameExtractor;
import com.howoocast.hywtl_has.project.parameter.ProjectAddParameter;
import com.howoocast.hywtl_has.project.parameter.ProjectSearchParameter;
import com.howoocast.hywtl_has.project.parameter.ProjectStatusUpdateParameter;
import com.howoocast.hywtl_has.project.parameter.ProjectUpdateParameter;
import com.howoocast.hywtl_has.project.service.ProjectService;
import com.howoocast.hywtl_has.project.view.ProjectShortView;
import com.howoocast.hywtl_has.project.view.ProjectView;
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
public class ProjectController {

    private final ProjectService service;

    @PostMapping("/project/sales/page")
    public List<ProjectShortView> page(
        @RequestBody ProjectSearchParameter parameter
    ) {
        return ProjectMapper.toShortView(service.getList(parameter));
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

    @PatchMapping("/project/sales/{id}/favorite")
    public void updateFavorite(
        @PathVariable Long id,
        @RequestBody ProjectUpdateParameter parameter
    ) {
        service.updateFavorite(id, parameter);
    }

    @DeleteMapping("/project/sales/{id}")
    public void delete(@PathVariable Long id,
        Authentication authentication) {
        service.delete(id, UsernameExtractor.get(authentication));
    }
}
