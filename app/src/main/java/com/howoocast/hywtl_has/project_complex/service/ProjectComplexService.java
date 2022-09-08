package com.howoocast.hywtl_has.project_complex.service;

import com.howoocast.hywtl_has.common.exception.IllegalRequestException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.project_document.domain.ProjectDocument;
import com.howoocast.hywtl_has.project_document.domain.ProjectDocumentType;
import com.howoocast.hywtl_has.project_document.repository.ProjectDocumentRepository;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_complex.domain.ProjectComplexBuilding;
import com.howoocast.hywtl_has.project_complex.domain.ProjectComplexSite;
import com.howoocast.hywtl_has.project_complex.parameter.ProjectComplexBuildingParameter;
import com.howoocast.hywtl_has.project_complex.parameter.ProjectComplexSiteParameter;
import com.howoocast.hywtl_has.project_complex.repository.ProjectComplexBuildingRepository;
import com.howoocast.hywtl_has.project_complex.repository.ProjectComplexSiteRepository;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
        return new CustomFinder<>(buildingRepository, ProjectComplexBuilding.class).byId(id);
    }

    @Transactional
    public void pushSite(Long projectId) {
        Project project = new CustomFinder<>(projectRepository, Project.class).byId(projectId);
        ProjectComplexSite instance = ProjectComplexSite.of(project);
        siteRepository.save(instance);
    }

    @Transactional
    public void updateSite(
        Long id,
        ProjectComplexSiteParameter parameter
    ) {
        ProjectComplexSite instance = new CustomFinder<>(siteRepository, ProjectComplexSite.class).byId(id);
        User manager = new CustomFinder<>(userRepository, User.class).byIdIfExists(parameter.getManagerId());
        instance.update(
            parameter.getName(),
            parameter.getWithEnvironmentTest(),
            parameter.getEstimateFigureDifficulty(),
            parameter.getFigureDifficulty(),
            manager
        );
    }

    @Transactional
    public void pushBuilding(Long projectId) {
        Project project = new CustomFinder<>(projectRepository, Project.class).byId(projectId);
        ProjectComplexBuilding instance = ProjectComplexBuilding.of(project);
        buildingRepository.save(instance);
    }

    @Transactional
    public void updateBuilding(
        Long id,
        ProjectComplexBuildingParameter parameter
    ) {
        ProjectComplexBuilding instance = new CustomFinder<>(buildingRepository, ProjectComplexBuilding.class).byId(id);
        ProjectComplexSite site = new CustomFinder<>(siteRepository, ProjectComplexSite.class).byIdIfExists(
            parameter.getSiteId());
        ProjectDocument buildingDocument = new CustomFinder<>(documentRepository, ProjectDocument.class).byIdIfExists(
            parameter.getBuildingDocumentId());

        if (Objects.nonNull(buildingDocument)) {
            if (!buildingDocument.getProject().getId().equals(instance.getProject().getId())) {
                throw new IllegalRequestException("project.complex.building.project.not_same",
                    "동일 프로젝트의 형상비 검토 파일만 사용할 수 있습니다.");
            }
            if (buildingDocument.getType() != ProjectDocumentType.BUILDING) {
                throw new IllegalRequestException("project.complex.building.building_file.violation",
                    "형상비 검토 파일만 사용할 수 있습니다.");
            }
        }

        instance.update(
            parameter.getName(),
            site,
            parameter.getShape(),
            parameter.getFloorCount(),
            parameter.getHeight(),
            parameter.getBaseArea(),
            buildingDocument,
            parameter.getSpecialWindWeightConditionList(),
            parameter.getInTest(),
            parameter.getTestTypeList(),
            parameter.getEstimateFigureDifficulty(),
            parameter.getEstimateTestDifficulty(),
            parameter.getEstimateEvaluationDifficulty(),
            parameter.getEstimateReportDifficulty()
        );
    }

    @Transactional
    public void deleteSite(Long id) {
        siteRepository.deleteById(id);
    }

    @Transactional
    public void deleteBuilding(Long id) {
        buildingRepository.deleteById(id);
    }

}
