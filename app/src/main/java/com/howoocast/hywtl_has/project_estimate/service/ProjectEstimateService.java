package com.howoocast.hywtl_has.project_estimate.service;

import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.service.ProjectFinder;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectEstimateParameter;
import com.howoocast.hywtl_has.project_estimate.view.ProjectEstimateView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectEstimateService {

    private final ProjectFinder finder;


    @Transactional(readOnly = true)
    public ProjectEstimateView getOne(Long id) {
        Project instance = finder.load(id);
        return ProjectEstimateView.assemble(instance.getEstimate());
    }

    @Transactional
    public void upsert(Long id, ProjectEstimateParameter params) {
        Project instance = finder.load(id);
        instance.changeEstimate(
            params.getReceivedDate(),
            params.getFigureLevel(),
            params.getTestLevel(),
            params.getReportLevel()
        );
    }
}
