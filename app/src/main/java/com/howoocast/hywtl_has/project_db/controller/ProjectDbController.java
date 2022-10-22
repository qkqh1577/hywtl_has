package com.howoocast.hywtl_has.project_db.controller;

import com.howoocast.hywtl_has.project_db.parameter.ProjectDbParameter;
import com.howoocast.hywtl_has.project_db.service.ProjectDbService;
import com.howoocast.hywtl_has.project_db.view.ProjectDbView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ProjectDbController {
    private final ProjectDbService projectDbService;

    @GetMapping("/project/db")
    public List<ProjectDbView> getList(ProjectDbParameter parameter) {
        log.debug(parameter.toString());
        return projectDbService.find(parameter);
    }

}
