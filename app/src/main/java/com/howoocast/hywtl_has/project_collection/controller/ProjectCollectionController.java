package com.howoocast.hywtl_has.project_collection.controller;

import com.howoocast.hywtl_has.project_collection.parameter.ProjectCollectionAddStageParameter;
import com.howoocast.hywtl_has.project_collection.parameter.ProjectCollectionChangeStageParameter;
import com.howoocast.hywtl_has.project_collection.parameter.ProjectCollectionChangeStageSeqParameter;
import com.howoocast.hywtl_has.project_collection.parameter.ProjectCollectionUpdateManagerParameter;
import com.howoocast.hywtl_has.project_collection.service.ProjectCollectionService;
import com.howoocast.hywtl_has.project_collection.view.ProjectCollectionStageView;
import com.howoocast.hywtl_has.project_collection.view.ProjectCollectionView;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class ProjectCollectionController {

    private final ProjectCollectionService service;

    @GetMapping("/project/sales/{projectId}/collection")
    public ProjectCollectionView get(
        @PathVariable Long projectId
    ) {
        return ProjectCollectionView.assemble(
            service.get(projectId)
        );
    }

    @GetMapping("/project/sales/collection/stage/{id}")
    public ProjectCollectionStageView getStage(
        @PathVariable Long id
    ) {
        return ProjectCollectionStageView.assemble(
            service.getStage(id)
        );
    }

    @PostMapping("/project/sales/{projectId}/collection/stage/seq")
    public void changeStageSeq(
        @PathVariable Long projectId,
        @Valid @RequestBody ProjectCollectionChangeStageSeqParameter parameter
    ) {
        service.changeStageSeq(projectId, parameter.getIdList());
    }

    @PutMapping("/project/sales/{projectId}/collection/stage")
    public void addStage(
        @PathVariable Long projectId,
        @Valid @RequestBody ProjectCollectionAddStageParameter parameter
    ) {
        service.addStage(projectId, parameter);
    }

    @PutMapping("/project/sales/collection/stage/{id}")
    public void changeStage(
        @PathVariable Long id,
        @Valid @RequestBody ProjectCollectionChangeStageParameter parameter
    ) {
        service.changeStage(id, parameter);
    }

    @PatchMapping("/project/sales/{projectId}/collection/manager")
    public void updateManager(
        @PathVariable Long projectId,
        @Valid @RequestBody ProjectCollectionUpdateManagerParameter parameter
    ) {
        service.updateManager(projectId, parameter.getUserId());
    }

    @DeleteMapping("/project/sales/collection/stage/{id}")
    public void deleteStage(
        @PathVariable Long id
    ) {
        service.deleteStage(id);
    }
}
