package com.howoocast.hywtl_has.project.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.parameter.ProjectOrderParameter;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project.view.ProjectOrderView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectOrderService {

    private final ProjectRepository repository;

    @Transactional(readOnly = true)
    public ProjectOrderView getOne(Long projectId) {
        Project instance = this.load(projectId);
        return ProjectOrderView.assemble(instance.getOrder());
    }

    @Transactional
    public void update(Long projectId, ProjectOrderParameter params) {
        Project instance = this.load(projectId);
        instance.changeOrder(
            params.getAmount(),
            params.getReceivedDate(),
            params.getBeginDate(),
            params.getCloseDate(),
            params.getIsOnGoing()
        );
    }

    private Project load(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("project", id));
    }
}
