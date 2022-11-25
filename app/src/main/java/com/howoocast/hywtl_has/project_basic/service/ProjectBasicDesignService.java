package com.howoocast.hywtl_has.project_basic.service;

import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicDesign;
import com.howoocast.hywtl_has.project_basic.parameter.ProjectBasicDesignParameter;
import com.howoocast.hywtl_has.project_basic.repository.ProjectBasicDesignRepository;
import com.howoocast.hywtl_has.project_log.domain.ProjectLogEvent;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectBasicDesignService {

    private final ProjectBasicDesignRepository projectBasicDesignRepository;
    private final ProjectRepository projectRepository;
    private final ApplicationEventPublisher eventPublisher;


    @Transactional(readOnly = true)
    public ProjectBasicDesign getDesign(Long id) {
        return projectBasicDesignRepository.findByProject_Id(id).orElse(ProjectBasicDesign.of(
            new CustomFinder<>(projectRepository, Project.class).byId(id)
        ));
    }

    @Transactional
    public void updateDesign(Long projectId, ProjectBasicDesignParameter parameter) {
        Project project = new CustomFinder<>(projectRepository, Project.class).byId(projectId);
        ProjectBasicDesign instance = projectBasicDesignRepository.findByProject_Id(projectId)
            .orElseGet(() -> ProjectBasicDesign.of(project));

        List<EventEntity> eventList = instance.update(
            parameter.getCity1(),
            parameter.getCity2(),
            parameter.getAddress(),
            parameter.getComplexCount(),
            parameter.getPurpose1(),
            parameter.getPurpose2(),
            parameter.getLotArea(),
            parameter.getTotalArea(),
            parameter.getTotalBuildingCount(),
            parameter.getHouseholdCount(),
            parameter.getMaximumFloor(),
            parameter.getMaximumHeight()
        );
        if (Objects.isNull(instance.getId())) {
            projectBasicDesignRepository.save(instance);
        }
        eventList.stream().map(event -> ProjectLogEvent.of(project, event)).forEach(eventPublisher::publishEvent);
    }


}
