package com.howoocast.hywtl_has.project_estimate.controller;

import com.howoocast.hywtl_has.project_estimate.parameter.RivalEstimateParameter;
import com.howoocast.hywtl_has.project_estimate.service.RivalEstimateService;
import com.howoocast.hywtl_has.project_estimate.view.RivalEstimateView;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
public class RivalEstimateController {


    private final RivalEstimateService service;

    @GetMapping("/project/sales/{projectId}/rival-estimate")
    public List<RivalEstimateView> getList(
        @PathVariable Long projectId
    ) {
        return RivalEstimateMapper.toView(service.getList(projectId));
    }

    @PostMapping("/project/sales/{projectId}/rival-estimate")
    public void push(
        @PathVariable Long projectId
    ) {
        service.push(projectId);
    }

    @PatchMapping("/project/sales/rival-estimate/{id}")
    public void update(
        @PathVariable Long id,
        @Valid @RequestBody RivalEstimateParameter parameter
    ) {
        service.update(id, parameter);
    }

    @DeleteMapping("/project/sales/rival-estimate/{id}")
    public void delete(
        @PathVariable Long id
    ) {
        service.delete(id);
    }

}
