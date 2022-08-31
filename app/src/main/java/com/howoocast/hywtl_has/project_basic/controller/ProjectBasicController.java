package com.howoocast.hywtl_has.project_basic.controller;

import com.howoocast.hywtl_has.project_basic.view.ProjectBasicBusinessView;
import com.howoocast.hywtl_has.project_basic.view.ProjectBasicDesignView;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ProjectBasicController {

    private final ProjectBasicService service;

    @GetMapping("/project/sales/{id}/basic/business")
    public List<ProjectBasicBusinessView> businessList(
        @PathVariable Long id
    ) {
        return ProjectBasicMapper.toBusinessView(
            service.getBusinessList(id)
        );
    }

    @GetMapping("/project/sales/{id}/basic/design")
    public ProjectBasicDesignView design(
        @PathVariable Long id
    ) {
        return ProjectBasicMapper.toView(
            service.getDesign(id)
        );
    }

    @GetMapping("/project/sales/{id}/basic/test")
    public ProjectBasicTestView test(
        @PathVariable Long id
    ) {
        return ProjectBasicMapper.toView(
            service.getTest(id)
        );
    }

    @GetMapping("/project/sales/{id}/basic/estimate")
    public ProjectBasicEstimateView estimate(
        @PathVariable Long id
    ) {
        return ProjectBasicMapper.toView(
            service.getEstimate(id)
        );
    }

    @GetMapping("/project/sales/{id}/basic/bid")
    public ProjectBasicBidView bid(
        @PathVariable Long id
    ) {
        return ProjectBasicMapper.toView(
            service.getBid(id)
        );
    }

    @GetMapping("/project/sales/{id}/basic/contract")
    public ProjectBasicContractView contract(
        @PathVariable Long id
    ) {
        return ProjectBasicMapper.toView(
            service.getContract(id)
        );
    }

    @GetMapping("/project/sales/{id}/basic/closed-reason")
    public ProjectBasicClosedReasonView closedReason(
        @PathVariable Long id
    ) {
        return ProjectBasicMapper.toView(
            service.getClosedReason(id)
        );
    }

    @PostMapping("/project/sales/{id}/basic/business")
    public void addBusiness(
        @PathVariable Long id,
        @Valid @RequestBody ProjectBasicBusinessAddParameter parameter
    ) {
        service.addBusiness(id, parameter);
    }


    @DeleteMapping("/project/sales/basic/business/{projectBasicBusinessId}")
    public void deleteBusiness(
        @PathVariable Long projectBasicBusinessId
    ) {
        service.deleteBusiness(projectBasicBusinessId);
    }


}
