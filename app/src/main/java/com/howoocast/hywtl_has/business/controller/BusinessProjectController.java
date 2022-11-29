package com.howoocast.hywtl_has.business.controller;

import com.howoocast.hywtl_has.business.domain.ProjectInvolvedType;
import com.howoocast.hywtl_has.business.service.BusinessProjectService;
import com.howoocast.hywtl_has.business.view.BusinessInvolvedProjectView;
import com.howoocast.hywtl_has.business.view.BusinessRivalProjectView;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class BusinessProjectController {

    private final BusinessProjectService service;

    @GetMapping("/business/{businessId}/involved-project")
    public List<BusinessInvolvedProjectView> getInvolvedList(
        @PathVariable Long businessId,
        @RequestParam(required = false) ProjectInvolvedType type
    ) {
        return service.getInvolvedList(businessId, type);
    }

    @GetMapping("/business/{businessId}/rival-project")
    public List<BusinessRivalProjectView> getRivalList(
        @PathVariable Long businessId
    ) {
        return service.getRivalList(businessId);
    }
}
