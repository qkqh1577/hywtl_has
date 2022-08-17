package com.howoocast.hywtl_has.project_estimate.controller;

import com.howoocast.hywtl_has.common.service.ValidationGroup;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectEstimateSheetParameter;
import com.howoocast.hywtl_has.project_estimate.service.ProjectEstimateSheetService;
import com.howoocast.hywtl_has.project_estimate.view.ProjectEstimateSheetShortView;
import com.howoocast.hywtl_has.project_estimate.view.ProjectEstimateSheetView;
import com.howoocast.hywtl_has.user.exception.UserLoginException;
import com.howoocast.hywtl_has.user.exception.UserLoginException.UserLoginExceptionType;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
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
public class ProjectEstimateSheetController {

    private final ProjectEstimateSheetService projectEstimateSheetService;

    @GetMapping("/projects/{projectId}/estimate/sheets")
    public List<ProjectEstimateSheetShortView> getList(@PathVariable Long projectId) {
        return projectEstimateSheetService.getList(projectId);
    }

    @GetMapping("/project/estimate/sheets/{id}")
    public ProjectEstimateSheetView getOne(@PathVariable Long id) {
        return projectEstimateSheetService.getOne(id);
    }

    @PostMapping("/projects/{projectId}/estimate/sheets")
    public ProjectEstimateSheetView add(
        @PathVariable Long projectId,
        Authentication authentication,
        @Validated(ValidationGroup.OnAdd.class) @Valid @RequestBody ProjectEstimateSheetParameter parameter
    ) {
        return projectEstimateSheetService.add(
            projectId,
            Optional.ofNullable(authentication).map(Authentication::getName)
                .orElseThrow(() -> new UserLoginException(UserLoginExceptionType.NOT_AUTHENTICATED)),
            parameter
        );
    }

    @PatchMapping("/project/estimate/sheets/{id}")
    public void change(
        @PathVariable Long id,
        @Validated(ValidationGroup.OnEdit.class) @Valid @RequestBody ProjectEstimateSheetParameter parameter
    ) {
        projectEstimateSheetService.change(id, parameter);
    }

}
