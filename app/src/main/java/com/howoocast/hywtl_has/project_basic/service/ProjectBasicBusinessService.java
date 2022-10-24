package com.howoocast.hywtl_has.project_basic.service;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.domain.BusinessManager;
import com.howoocast.hywtl_has.business.repository.BusinessManagerRepository;
import com.howoocast.hywtl_has.business.repository.BusinessRepository;
import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicBusiness;
import com.howoocast.hywtl_has.project_basic.parameter.ProjectBasicBusinessParameter;
import com.howoocast.hywtl_has.project_basic.repository.ProjectBasicBusinessRepository;
import com.howoocast.hywtl_has.project_log.domain.ProjectLogEvent;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectBasicBusinessService {

    private final ProjectBasicBusinessRepository repository;
    private final BusinessManagerRepository businessManagerRepository;
    private final BusinessRepository businessRepository;
    private final ProjectRepository projectRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional(readOnly = true)
    public List<ProjectBasicBusiness> getList(Long projectId) {
        return repository.findByProject_Id(projectId);
    }

    @Transactional(readOnly = true)
    public ProjectBasicBusiness get(Long id) {
        return this.load(id);
    }


    @Transactional
    public void add(Long projectId, ProjectBasicBusinessParameter parameter) {
        Project project = new CustomFinder<>(projectRepository, Project.class).byId(projectId);
        Business business = new CustomFinder<>(businessRepository, Business.class).byId(parameter.getBusinessId());
        BusinessManager businessManager = new CustomFinder<>(businessManagerRepository, BusinessManager.class).byId(
            parameter.getBusinessManagerId());

        ProjectBasicBusiness instance = ProjectBasicBusiness.of(
            parameter.getInvolvedType(),
            project,
            business,
            businessManager
        );
        repository.save(instance);
        eventPublisher.publishEvent(ProjectLogEvent.of(
            project,
            "관계사 행 추가"
        ));
    }

    @Transactional
    public void change(Long id, ProjectBasicBusinessParameter parameter) {
        ProjectBasicBusiness instance = this.load(id);
        Business business = new CustomFinder<>(businessRepository, Business.class).byId(parameter.getBusinessId());
        BusinessManager businessManager = new CustomFinder<>(businessManagerRepository, BusinessManager.class).byId(
            parameter.getBusinessManagerId());

        List<EventEntity> eventList = instance.change(
            parameter.getInvolvedType(),
            business,
            businessManager
        );
        eventList.stream().map(event -> ProjectLogEvent.of(instance.getProject(), event))
            .forEach(eventPublisher::publishEvent);
    }

    @Transactional
    public void delete(Long projectBasicBusinessId) {
        ProjectBasicBusiness instance = this.load(projectBasicBusinessId);
        eventPublisher.publishEvent(ProjectLogEvent.of(
            instance.getProject(),
            "프로젝트 관계사 삭제",
            String.format("%s: %s", instance.getInvolvedType().getName(), instance.getBusiness().getName()),
            null
        ));
        instance.delete();
    }


    private ProjectBasicBusiness load(Long id) {
        return repository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(ProjectBasicBusiness.KEY, id);
        });
    }
}
