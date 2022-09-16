package com.howoocast.hywtl_has.project_contract.controller;

import com.howoocast.hywtl_has.common.util.UsernameExtractor;
import com.howoocast.hywtl_has.project_contract.parameter.ProjectContractConfirmedParameter;
import com.howoocast.hywtl_has.project_contract.parameter.ProjectContractParameter;
import com.howoocast.hywtl_has.project_contract.service.ProjectContractService;
import com.howoocast.hywtl_has.project_contract.view.ProjectContractShortView;
import com.howoocast.hywtl_has.project_contract.view.ProjectContractView;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class ProjectContractController {

    private final ProjectContractService service;

    @GetMapping("/project/sales/{projectId}/contract")
    public List<ProjectContractShortView> getList(
        @PathVariable Long projectId
    ) {
        return service.getList(projectId).stream()
            .map(ProjectContractShortView::assemble)
            .collect(Collectors.toList());
    }

    @GetMapping("/project/sales/contract/{id}")
    public ProjectContractView get(
        @PathVariable Long id
    ) {
        return ProjectContractView.assemble(
            service.get(id)
        );
    }

    @PostMapping("/project/sales/{projectId}/contract/confirmed")
    public void confirmed(
        @PathVariable Long projectId,
        @Valid @RequestBody ProjectContractConfirmedParameter parameter
    ) {
        service.confirm(projectId, parameter);
    }

    @PutMapping("/project/sales/{projectId}/contract")
    public void add(
        @PathVariable Long projectId,
        Authentication authentication,
        @Valid @RequestBody ProjectContractParameter parameter
    ) {
        service.add(
            projectId,
            UsernameExtractor.get(authentication),
            parameter
        );
    }

    @PutMapping("/project/sales/contract/{id}")
    public void change(
        @PathVariable Long id,
        @Valid @ModelAttribute ProjectContractParameter parameter
    ) {
        service.change(id, parameter);
    }
}
