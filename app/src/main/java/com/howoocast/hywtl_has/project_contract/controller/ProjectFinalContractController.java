package com.howoocast.hywtl_has.project_contract.controller;

import com.howoocast.hywtl_has.project_contract.parameter.ProjectFinalContractParameter;
import com.howoocast.hywtl_has.project_contract.service.ProjectFinalContractService;
import com.howoocast.hywtl_has.project_contract.view.ProjectFinalContractShortView;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequiredArgsConstructor
public class ProjectFinalContractController {
    private final ProjectFinalContractService service;

    @GetMapping("/project/sales/{projectId}/contract/final")
    public ProjectFinalContractShortView finalEstimate(
        @PathVariable Long projectId
    ) {
        return ProjectFinalContractShortView.assemble(
            service.getFinalContract(projectId)
        );
    }

    @PatchMapping("/project/sales/{projectId}/contract/final")
    public void updateFinalEstimate(
        @PathVariable Long projectId,
        @Valid @RequestBody ProjectFinalContractParameter parameter
    ) {
        service.updateFinalContract(projectId, parameter);
    }
}
