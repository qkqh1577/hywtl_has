package com.howoocast.hywtl_has.project_complex.service;

import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.common.exception.IllegalRequestException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_complex.domain.ProjectComplexBuilding;
import com.howoocast.hywtl_has.project_complex.domain.ProjectComplexSite;
import com.howoocast.hywtl_has.project_complex.parameter.ProjectComplexBuildingParameter;
import com.howoocast.hywtl_has.project_complex.parameter.ProjectComplexSiteParameter;
import com.howoocast.hywtl_has.project_complex.repository.ProjectComplexBuildingRepository;
import com.howoocast.hywtl_has.project_complex.repository.ProjectComplexSiteRepository;
import com.howoocast.hywtl_has.project_document.domain.ProjectDocument;
import com.howoocast.hywtl_has.project_document.domain.ProjectDocumentType;
import com.howoocast.hywtl_has.project_document.repository.ProjectDocumentRepository;
import com.howoocast.hywtl_has.project_log.domain.ProjectLogEvent;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
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
public class ProjectComplexService {

    private final ProjectComplexSiteRepository siteRepository;

    private final ProjectComplexBuildingRepository buildingRepository;

    private final ProjectRepository projectRepository;

    private final ProjectDocumentRepository documentRepository;

    private final UserRepository userRepository;

    private final ApplicationEventPublisher eventPublisher;

    @Transactional(readOnly = true)
    public List<ProjectComplexSite> getSiteList(Long projectId) {
        return siteRepository.findByProject_Id(projectId);
    }

    @Transactional(readOnly = true)
    public List<ProjectComplexBuilding> getBuildingList(Long projectId) {
        return buildingRepository.findByProject_Id(projectId);
    }

    @Transactional(readOnly = true)
    public ProjectComplexBuilding getBuilding(Long id) {
        return this.loadBuilding(id);
    }

    @Transactional
    public void pushSite(Long projectId) {
        Project project = new CustomFinder<>(projectRepository, Project.class).byId(projectId);
        ProjectComplexSite instance = ProjectComplexSite.of(project);
        siteRepository.save(instance);
        eventPublisher.publishEvent(ProjectLogEvent.of(
            project,
            "?????? ?????? ??? ??????"
        ));
    }

    @Transactional
    public void updateSite(
        Long id,
        ProjectComplexSiteParameter parameter
    ) {
        ProjectComplexSite instance = this.loadSite(id);
        User manager = new CustomFinder<>(userRepository, User.class).byIdIfExists(parameter.getManagerId());
        List<EventEntity> eventList = instance.update(
            parameter.getName(),
            parameter.getWithEnvironmentTest(),
            parameter.getEstimateFigureDifficulty(),
            parameter.getFigureDifficulty(),
            manager
        );
        eventList.stream().map(event -> ProjectLogEvent.of(instance.getProject(), event))
            .forEach(eventPublisher::publishEvent);
    }

    @Transactional
    public void pushBuilding(Long projectId) {
        Project project = new CustomFinder<>(projectRepository, Project.class).byId(projectId);
        ProjectComplexBuilding instance = ProjectComplexBuilding.of(project);
        buildingRepository.save(instance);
        eventPublisher.publishEvent(ProjectLogEvent.of(
            project,
            "??? ??? ??????"
        ));
    }

    @Transactional
    public void updateBuilding(
        Long id,
        ProjectComplexBuildingParameter parameter
    ) {
        ProjectComplexBuilding instance = this.loadBuilding(id);
        ProjectComplexSite site = new CustomFinder<>(siteRepository, ProjectComplexSite.class).byIdIfExists(
            parameter.getSiteId());
        ProjectDocument buildingDocument = new CustomFinder<>(documentRepository, ProjectDocument.class).byIdIfExists(
            parameter.getBuildingDocumentId());

        if (Objects.nonNull(buildingDocument)) {
            if (!Objects.equals(buildingDocument.getProject().getId(), instance.getProject().getId())) {
                throw new IllegalRequestException("project.complex.building.project.not_same",
                    "?????? ??????????????? ????????? ?????? ????????? ????????? ??? ????????????.");
            }
            if (buildingDocument.getType() != ProjectDocumentType.BUILDING) {
                throw new IllegalRequestException("project.complex.building.building_file.violation",
                    "????????? ?????? ????????? ????????? ??? ????????????.");
            }
        }

        List<EventEntity> eventList = instance.update(
            parameter.getName(),
            site,
            parameter.getShape(),
            parameter.getFloorCount(),
            parameter.getHeight(),
            parameter.getBaseArea(),
            buildingDocument,
            parameter.getConditionList(),
            parameter.getInTest(),
            parameter.getTestTypeList(),
            parameter.getEstimateFigureDifficulty(),
            parameter.getEstimateTestDifficulty(),
            parameter.getEstimateEvaluationDifficulty(),
            parameter.getEstimateReportDifficulty()
        );
        if (Objects.nonNull(parameter.getSiteId()) && parameter.getSiteId() < 0) {
            eventList.add(instance.unlinkSite());
        }
        if (Objects.nonNull(parameter.getBuildingDocumentId()) && parameter.getBuildingDocumentId() < 0) {
            eventList.add(instance.unlinkDocument());
        }
        eventList.stream().map(event -> ProjectLogEvent.of(instance.getProject(), event))
            .forEach(eventPublisher::publishEvent);
    }

    @Transactional
    public void deleteSite(Long id) {
        ProjectComplexSite instance = this.loadSite(id);
        eventPublisher.publishEvent(ProjectLogEvent.of(
            instance.getProject(),
            "?????? ?????? ??????",
            instance.getName(),
            null
        ));
        instance.delete();
    }

    @Transactional
    public void deleteBuilding(Long id) {
        ProjectComplexBuilding instance = this.loadBuilding(id);
        eventPublisher.publishEvent(ProjectLogEvent.of(
            instance.getProject(),
            "??? ??????",
            instance.getName(),
            null
        ));
        instance.delete();
    }

    private ProjectComplexSite loadSite(Long id) {
        return siteRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(ProjectComplexSite.KEY, id);
        });
    }

    private ProjectComplexBuilding loadBuilding(Long id) {
        return buildingRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(ProjectComplexBuilding.KEY, id);
        });
    }
}
