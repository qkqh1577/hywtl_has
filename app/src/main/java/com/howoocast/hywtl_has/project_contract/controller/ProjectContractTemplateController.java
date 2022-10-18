package com.howoocast.hywtl_has.project_contract.controller;

import com.howoocast.hywtl_has.project_contract.service.ProjectContractTemplateService;
import com.howoocast.hywtl_has.project_contract.view.ProjectContractBasicView;
import com.howoocast.hywtl_has.project_contract.view.ProjectContractCollectionView;
import com.howoocast.hywtl_has.project_contract.view.ProjectContractConditionView;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ProjectContractTemplateController {

    private final ProjectContractTemplateService service;

    @GetMapping("/project/sales/{projectId}/contract/basic")
    public ProjectContractBasicView basic(
        @PathVariable Long projectId
    ) {
        return ProjectContractBasicView.assemble(
            service.basic(projectId)
        );
    }

    @GetMapping("/project/sales/contract/collection")
    public ProjectContractCollectionView collection(
        @RequestParam(required = false) Long estimateId
    ) {
        return ProjectContractCollectionView.assemble(
            service.collection(estimateId)
        );
    }

    @GetMapping("/project/sales/{projectId}/contract/condition")
    public List<ProjectContractConditionView> conditionList(
        @PathVariable Long projectId,
        @RequestParam(required = false) Long estimateId
    ) {
        return service.conditionList(projectId, estimateId).stream()
            .map(ProjectContractConditionView::assemble)
            .collect(Collectors.toList());
    }
}
