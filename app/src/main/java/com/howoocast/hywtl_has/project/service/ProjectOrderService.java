package com.howoocast.hywtl_has.project.service;

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

    private final ProjectRepository projectRepository;

    @Transactional(readOnly = true)
    public ProjectOrderView getOne(Long projectId) {
        return ProjectOrderView.assemble(Project.load(projectRepository, projectId).getOrder());
    }

    @Transactional
    public void update(Long projectId, ProjectOrderParameter params) {
        Project.load(projectRepository, projectId)
            .changeOrder(
                params.getAmount(),
                params.getReceivedDate(),
                params.getBeginDate(),
                params.getCloseDate(),
                params.getIsOnGoing()
            );
    }
}
