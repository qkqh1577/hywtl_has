package com.howoocast.hywtl_has.project.service;

import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.parameter.ProjectOrderParameter;
import com.howoocast.hywtl_has.project.view.ProjectOrderView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectOrderService {

    private final ProjectFinder finder;

    @Transactional(readOnly = true)
    public ProjectOrderView getOne(Long projectId) {
        Project instance = finder.load(projectId);
        return ProjectOrderView.assemble(instance.getOrder());
    }

    @Transactional
    public void update(Long projectId, ProjectOrderParameter parameter) {
        parameter.changeOrderBuilder()
            .action(finder.load(projectId));
    }

}
