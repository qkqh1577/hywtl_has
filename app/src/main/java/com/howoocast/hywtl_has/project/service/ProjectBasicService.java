package com.howoocast.hywtl_has.project.service;

import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.parameter.ProjectBasicParameter;
import com.howoocast.hywtl_has.project.parameter.ProjectStatusParameter;
import com.howoocast.hywtl_has.project.view.ProjectBasicView;
import com.howoocast.hywtl_has.user.service.UserFinder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectBasicService {

    private final ProjectFinder finder;
    private final UserFinder userFinder;

    @Transactional(readOnly = true)
    public ProjectBasicView getOne(Long projectId) {
        Project instance = finder.load(projectId);
        return ProjectBasicView.assemble(instance.getBasic());
    }

    @Transactional
    public void update(Long projectId, ProjectBasicParameter parameter) {
        parameter.changeBuilder()
            .salesManager(userFinder.load(parameter.getSalesManagerId()))
            .projectManager(userFinder.load(parameter.getProjectManagerId()))
            .action(finder.load(projectId));
    }

    @Transactional
    public void update(Long projectId, ProjectStatusParameter parameter) {
        parameter.statusChangeBuilder()
            .action(finder.load(projectId));
    }
}
