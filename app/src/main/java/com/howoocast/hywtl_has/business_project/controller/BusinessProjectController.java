package com.howoocast.hywtl_has.business_project.controller;

import com.howoocast.hywtl_has.business_project.view.BusinessInvolvedProjectView;
import com.howoocast.hywtl_has.business_project.view.BusinessRivalProjectView;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class BusinessProjectController {

    @GetMapping("/business/{businessId}/involved-project")
    public List<BusinessInvolvedProjectView> getInvolvedList(
        @PathVariable Long businessId
    ) {
        // TODO: findProjectByBusinessId
        return Collections.emptyList();
    }

    @GetMapping("/business/{businessId}/rival-project")
    public List<BusinessRivalProjectView> getRivalList(
        @PathVariable Long businessId
    ) {
        // TODO: findProjectByBusinessId
        return Collections.emptyList();
    }
}
