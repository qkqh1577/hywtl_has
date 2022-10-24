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
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicContributor;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicExternalContributor;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicInternalContributor;
import com.howoocast.hywtl_has.project_basic.parameter.ProjectBasicExternalContributorParameter;
import com.howoocast.hywtl_has.project_basic.parameter.ProjectBasicInternalContributorParameter;
import com.howoocast.hywtl_has.project_basic.repository.ProjectBasicExternalContributorRepository;
import com.howoocast.hywtl_has.project_basic.repository.ProjectBasicInternalContributorRepository;
import com.howoocast.hywtl_has.project_log.domain.ProjectLogEvent;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectBasicContributorService {

    private final ProjectBasicInternalContributorRepository internalContributorRepository;
    private final ProjectBasicExternalContributorRepository externalContributorRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final BusinessRepository businessRepository;
    private final BusinessManagerRepository businessManagerRepository;
    private final ApplicationEventPublisher eventPublisher;


    @Transactional(readOnly = true)
    public List<ProjectBasicInternalContributor> getInternalList(Long projectId) {
        return internalContributorRepository.findByProject_Id(projectId);
    }

    @Transactional(readOnly = true)
    public List<ProjectBasicExternalContributor> getExternalList(Long projectId) {
        return externalContributorRepository.findByProject_Id(projectId);
    }

    @Transactional
    public void addInternal(Long projectId) {
        Project project = new CustomFinder<>(projectRepository, Project.class).byId(projectId);
        ProjectBasicInternalContributor instance = ProjectBasicInternalContributor.of(project);
        internalContributorRepository.save(instance);
        eventPublisher.publishEvent(ProjectLogEvent.of(
            project,
            "사내 기여자 추가"
        ));
    }

    @Transactional
    public void updateInternal(Long id, ProjectBasicInternalContributorParameter parameter) {
        ProjectBasicInternalContributor instance = this.loadInternal(id);
        User user = new CustomFinder<>(userRepository, User.class).byIdIfExists(parameter.getUserId());
        List<EventEntity> eventList = instance.update(
            parameter.getRate(),
            user
        );
        eventList.stream().map(event -> ProjectLogEvent.of(instance.getProject(), event))
            .forEach(eventPublisher::publishEvent);
    }


    @Transactional
    public void addExternal(Long projectId) {
        Project project = new CustomFinder<>(projectRepository, Project.class).byId(projectId);
        ProjectBasicExternalContributor instance = ProjectBasicExternalContributor.of(project);
        externalContributorRepository.save(instance);
        eventPublisher.publishEvent(ProjectLogEvent.of(
            project,
            "사외 기여자 추가"
        ));
    }

    @Transactional
    public void updateExternal(Long id, ProjectBasicExternalContributorParameter parameter) {
        ProjectBasicExternalContributor instance = this.loadExternal(id);
        Business business = new CustomFinder<>(businessRepository, Business.class).byId(parameter.getBusinessId());
        BusinessManager businessManager = new CustomFinder<>(businessManagerRepository, BusinessManager.class).byId(
            parameter.getBusinessManagerId());

        List<EventEntity> eventList = instance.update(
            parameter.getRate(),
            business,
            businessManager
        );
        eventList.stream().map(event -> ProjectLogEvent.of(instance.getProject(), event))
            .forEach(eventPublisher::publishEvent);
    }

    @Transactional
    public void deleteInternal(Long id) {
        ProjectBasicContributor instance = this.loadInternal(id);
        eventPublisher.publishEvent(ProjectLogEvent.of(
            instance.getProject(),
            "사내 기여자 삭제"
        ));
        instance.delete();
    }

    @Transactional
    public void deleteExternal(Long id) {
        ProjectBasicContributor instance = this.loadExternal(id);
        eventPublisher.publishEvent(ProjectLogEvent.of(
            instance.getProject(),
            "사외 기여자 삭제"
        ));
        instance.delete();
    }

    private ProjectBasicInternalContributor loadInternal(Long id) {
        return internalContributorRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(ProjectBasicInternalContributor.KEY, id);
        });
    }

    private ProjectBasicExternalContributor loadExternal(Long id) {
        return externalContributorRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(ProjectBasicExternalContributor.KEY, id);
        });
    }

}
