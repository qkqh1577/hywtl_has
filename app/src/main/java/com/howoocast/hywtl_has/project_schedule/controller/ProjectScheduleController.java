package com.howoocast.hywtl_has.project_schedule.controller;

import com.howoocast.hywtl_has.project_schedule.parameter.ProjectScheduleParameter;
import com.howoocast.hywtl_has.project_schedule.parameter.ProjectSchedulePredicateBuilder;
import com.howoocast.hywtl_has.project_schedule.service.ProjectScheduleService;
import com.howoocast.hywtl_has.project_schedule.view.ProjectScheduleView;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class ProjectScheduleController {

    private final ProjectScheduleService service;

    @GetMapping("/project/sales/{projectId}/schedule")
    public List<ProjectScheduleView> getList(
        @PathVariable Long projectId,
        @RequestParam(required = false) String keyword,
        @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
        @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate,
        @RequestParam(required = false) String type
    ) {

        return service.getList(
                new ProjectSchedulePredicateBuilder()
                    .project(projectId)
                    .dateBetween(startDate, endDate)
                    .keyword(keyword)
                    .type(type)
                    .build()
            )
            .stream()
            .map(ProjectScheduleView::assemble)
            .collect(Collectors.toList());
    }

    @PutMapping("/project/sales/{projectId}/schedule")
    public void add(
        @PathVariable Long projectId,
        @Valid @RequestBody ProjectScheduleParameter parameter
    ) {
        service.add(projectId, parameter);
    }

    @PutMapping("/project/sales/schedule/{id}")
    public void change(
        @PathVariable Long id,
        @Valid @RequestBody ProjectScheduleParameter parameter
    ) {
        service.change(id, parameter);
    }

    @DeleteMapping("/project/sales/schedule/{id}")
    public void delete(
        @PathVariable Long id
    ) {
        service.delete(id);
    }
}
