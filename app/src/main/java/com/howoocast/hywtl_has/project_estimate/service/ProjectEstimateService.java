package com.howoocast.hywtl_has.project_estimate.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
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

    private final ProjectRepository repository;

    @Transactional(readOnly = true)
    public ProjectEstimateView getOne(Long id) {
        Project instance = this.load(id);
        return ProjectEstimateView.assemble(instance.getEstimate());
    }

    @Transactional
    public void upsert(Long id, ProjectEstimateParameter params) {
        Project instance = this.load(id);
        instance.changeEstimate(
            params.getReceivedDate(),
            params.getFigureLevel(),
            params.getTestLevel(),
            params.getReportLevel()
        );
    }

    private Project load(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("project", id));
    }
}
