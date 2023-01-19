package com.howoocast.hywtl_has.project_contract.controller;

import com.howoocast.hywtl_has.project_contract.parameter.ProjectContractCollectionParameter;
import com.howoocast.hywtl_has.project_contract.parameter.ProjectFinalContractParameter;
import com.howoocast.hywtl_has.project_contract.service.ProjectFinalContractService;
import com.howoocast.hywtl_has.project_contract.view.ProjectFinalContractShortView;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequiredArgsConstructor
public class ProjectFinalContractController {

    private final ProjectFinalContractService service;

    @GetMapping("/project/sales/{projectId}/contract/final")
    public ProjectFinalContractShortView get(
        @PathVariable Long projectId
    ) {
        return ProjectFinalContractShortView.assemble(
            service.get(projectId)
        );
    }

    @GetMapping("/project/sales/{projectId}/basic/contract/final")
    public ProjectFinalContractShortView getFinal(
        @PathVariable Long projectId
    ) {
        return ProjectFinalContractShortView.assemble(service.get(projectId));
    }

    @PatchMapping("/project/sales/{projectId}/contract/final")
    public void update(
        @PathVariable Long projectId,
        @Valid @RequestBody ProjectFinalContractParameter parameter
    ) {
        service.update(projectId, parameter);
    }

    @PutMapping("/project/sales/{projectId}/contract/final/collection")
    public void updateFinalContractCollection(
        @PathVariable Long projectId,
        @Valid @RequestBody ProjectContractCollectionParameter parameter
    ) {
        service.updateFinalContractCollection(projectId, parameter);
    }
}
