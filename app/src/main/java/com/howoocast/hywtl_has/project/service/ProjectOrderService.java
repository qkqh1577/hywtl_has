package com.howoocast.hywtl_has.project.service;

import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.domain.ProjectOrder;
import com.howoocast.hywtl_has.project.parameter.ProjectOrderParameter;
import com.howoocast.hywtl_has.project.repository.ProjectOrderRepository;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project.view.ProjectOrderView;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectOrderService {

    private final ProjectOrderRepository repository;
    private final ProjectRepository projectRepository;

    @Transactional(readOnly = true)
    public ProjectOrderView getOne(Long projectId) {
        return ProjectOrderView.assemble(ProjectOrder.find(repository, projectId));
    }

    @Transactional
    public void update(Long projectId, ProjectOrderParameter params) {
        ProjectOrder projectOrder = ProjectOrder.find(repository, projectId);
        if (Objects.isNull(projectOrder)) {
            projectOrder = ProjectOrder.of(
                repository,
                params.getAmount(),
                params.getReceivedDate(),
                params.getBeginDate(),
                params.getCloseDate(),
                params.getIsOnGoing()
            );
        } else {
            projectOrder.change(
                params.getAmount(),
                params.getReceivedDate(),
                params.getBeginDate(),
                params.getCloseDate(),
                params.getIsOnGoing()
            );
        }
        Project.load(projectRepository, projectId).change(projectOrder);
    }
}
