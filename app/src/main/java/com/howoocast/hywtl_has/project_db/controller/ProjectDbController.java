package com.howoocast.hywtl_has.project_db.controller;

import com.howoocast.hywtl_has.project_db.parameter.ProjectDbParameter;
import com.howoocast.hywtl_has.project_db.parameter.ProjectDbPresetParameter;
import com.howoocast.hywtl_has.project_db.service.ProjectDbPresetService;
import com.howoocast.hywtl_has.project_db.service.ProjectDbService;
import com.howoocast.hywtl_has.project_db.view.ProjectDbPresetView;
import com.howoocast.hywtl_has.project_db.view.ProjectDbSchemaView;
import com.howoocast.hywtl_has.project_db.view.ProjectDbView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ProjectDbController {
    private final ProjectDbService projectDbService;
    private final ProjectDbPresetService projectDbPresetService;

    @GetMapping("/project/db")
    public List<ProjectDbView> getList(@ModelAttribute ProjectDbParameter parameter) {
        log.debug(parameter.toString());
        return projectDbService.list(parameter);
    }

    @GetMapping("/project/db/schema")
    public ProjectDbSchemaView getSchema(ProjectDbParameter parameter) {
        return projectDbService.getInformationSchema();
    }

    @GetMapping("/project/db/preset")
    public List<ProjectDbPresetView> getPresetList() {
        return projectDbPresetService.list();
    }

    @GetMapping("/project/db/preset/{id}")
    public ProjectDbPresetView getPreset(@PathVariable Long id){
        return projectDbPresetService.find(id);
    }

    @PostMapping("/project/db/preset")
    public void addPreset(@Valid @RequestBody ProjectDbPresetParameter parameter){
        projectDbPresetService.add(parameter);
    }

    @PatchMapping("/project/db/preset/{id}")
    public void changePreset(@PathVariable Long id, @Valid @RequestBody ProjectDbPresetParameter parameter) {
        projectDbPresetService.change(id, parameter);
    }

    @DeleteMapping("/project/db/preset/{id}")
    public void deletePreset(@PathVariable Long id) {
        projectDbPresetService.remove(id);
    }

}
