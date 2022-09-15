package com.howoocast.hywtl_has.project_estimate.service;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.repository.BusinessRepository;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.file.domain.FileItem;
import com.howoocast.hywtl_has.file.service.FileItemService;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_document.domain.ProjectDocument;
import com.howoocast.hywtl_has.project_document.repository.ProjectDocumentRepository;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectCustomEstimate;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectCustomEstimateComplexBuilding;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectCustomEstimateComplexSite;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectCustomEstimateExtensionInput;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectCustomEstimateAddParameter;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectCustomEstimateChangeParameter;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectCustomEstimateComplexBuildingParameter;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectCustomEstimateComplexSiteParameter;
import com.howoocast.hywtl_has.project_estimate.parameter.ProjectCustomEstimateExtensionParameter;
import com.howoocast.hywtl_has.project_estimate.repository.ProjectCustomEstimateComplexBuildingRepository;
import com.howoocast.hywtl_has.project_estimate.repository.ProjectCustomEstimateComplexSiteRepository;
import com.howoocast.hywtl_has.project_estimate.repository.ProjectCustomEstimateRepository;
import com.howoocast.hywtl_has.project_estimate.repository.ProjectEstimateRepository;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectCustomEstimateService {

    private final ProjectCustomEstimateRepository repository;

    private final ProjectCustomEstimateComplexSiteRepository complexSiteRepository;

    private final ProjectCustomEstimateComplexBuildingRepository complexBuildingRepository;

    private final ProjectEstimateRepository estimateRepository;
    private final ProjectRepository projectRepository;

    private final ProjectDocumentRepository documentRepository;

    private final UserRepository userRepository;

    private final BusinessRepository businessRepository;

    private final FileItemService fileItemService;

    @Transactional(readOnly = true)
    public ProjectCustomEstimate get(Long id) {
        return repository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(ProjectCustomEstimate.KEY, id);
        });
    }

    @Transactional
    public void add(
        Long projectId,
        String username,
        ProjectCustomEstimateAddParameter parameter
    ) {
        Project project = new CustomFinder<>(projectRepository, Project.class).byId(projectId);
        User writer = new CustomFinder<>(userRepository, User.class).byField(username, "username");
        Business business = new CustomFinder<>(businessRepository, Business.class).byId(parameter.getBusinessId());
        String code = getCode(project);
        FileItem file = Objects.requireNonNull(fileItemService.build(parameter.getFile()));

        ProjectCustomEstimate instance = ProjectCustomEstimate.of(
            file,
            code,
            parameter.getType(),
            parameter.getIsSent(),
            parameter.getRecipient(),
            parameter.getNote(),
            writer,
            project,
            business
        );

        repository.save(instance);
    }

    @Transactional
    public void change(
        Long id,
        ProjectCustomEstimateChangeParameter parameter
    ) {
        ProjectCustomEstimate instance = this.load(id);
        Business business = new CustomFinder<>(businessRepository, Business.class).byId(parameter.getBusinessId());

        instance.change(
            parameter.getIsSent(),
            parameter.getRecipient(),
            parameter.getNote(),
            business
        );
    }

    @Transactional
    public void extend(
        Long id,
        ProjectCustomEstimateExtensionParameter parameter
    ) {
        ProjectCustomEstimate instance = this.load(id);
        instance.changeExtension(
            ProjectCustomEstimateExtensionInput.of(
                parameter.getEstimateDate(),
                parameter.getExpectedServiceDate(),
                parameter.getExpectedTestDeadline(),
                parameter.getExpectedFinalReviewDeadline(),
                parameter.getTestAmount(),
                parameter.getReviewAmount(),
                parameter.getDiscountAmount(),
                parameter.getTotalAmount()
            )
        );

        List<ProjectCustomEstimateComplexSiteParameter> siteParameterList = parameter.getSiteList();
        Map<Long, ProjectCustomEstimateComplexSite> siteIdMapper = new HashMap<>();
        List<Long> siteIdList = new ArrayList<>();

        if (Objects.nonNull(siteParameterList) && !siteParameterList.isEmpty()) {
            for (ProjectCustomEstimateComplexSiteParameter siteParameter : siteParameterList) {
                User manager = new CustomFinder<>(userRepository, User.class)
                    .byIdIfExists(siteParameter.getManagerId());

                if (siteParameter.getId() < 0) {
                    Long tmpId = siteParameter.getId();
                    siteParameter.setId(null);

                    ProjectCustomEstimateComplexSite siteInstance = ProjectCustomEstimateComplexSite.of(
                        instance
                    );
                    siteInstance.change(
                        siteParameter.getName(),
                        siteParameter.getWithEnvironmentTest(),
                        siteParameter.getEstimateFigureDifficulty(),
                        siteParameter.getFigureDifficulty(),
                        manager
                    );
                    siteInstance = complexSiteRepository.save(siteInstance);
                    siteIdMapper.put(tmpId, siteInstance);
                    siteIdList.add(siteInstance.getId());
                } else {
                    ProjectCustomEstimateComplexSite siteInstance = complexSiteRepository.findById(
                        siteParameter.getId()).orElseThrow(() -> {
                        throw new NotFoundException(ProjectCustomEstimateComplexSite.KEY, id);
                    });
                    siteInstance.change(
                        siteParameter.getName(),
                        siteParameter.getWithEnvironmentTest(),
                        siteParameter.getEstimateFigureDifficulty(),
                        siteParameter.getFigureDifficulty(),
                        manager
                    );
                    siteIdList.add(siteInstance.getId());
                }
            }
        }

        List<ProjectCustomEstimateComplexSite> siteList = complexSiteRepository.findByEstimate_Id(id);
        siteList.forEach((item) -> {
            if (!siteIdList.contains(item.getId())) {
                complexSiteRepository.deleteById(item.getId());
            }
        });

        List<ProjectCustomEstimateComplexBuildingParameter> buildingParameterList = parameter.getBuildingList();
        List<Long> buildingIdList = new ArrayList<>();
        if (Objects.nonNull(buildingParameterList) && !buildingParameterList.isEmpty()) {
            for (ProjectCustomEstimateComplexBuildingParameter buildingParameter : buildingParameterList) {
                ProjectCustomEstimateComplexBuilding buildingInstance = Optional
                    .ofNullable(buildingParameter.getId())
                    .map(buildingId -> complexBuildingRepository.findById(buildingId)
                        .orElseThrow(() -> {
                            throw new NotFoundException(ProjectCustomEstimateComplexBuilding.KEY, buildingId);
                        }))
                    .orElseGet(() -> complexBuildingRepository.save(ProjectCustomEstimateComplexBuilding.of(instance)));

                ProjectCustomEstimateComplexSite site = Optional
                    .ofNullable(buildingParameter.getSiteId())
                    .map(siteId -> {
                        if (siteId > 0) {
                            return siteList.stream().filter(item -> item.getId().equals(siteId)).findFirst()
                                .orElseThrow(() -> {
                                    throw new NotFoundException(ProjectCustomEstimateComplexSite.KEY, siteId);
                                });
                        }
                        return siteIdMapper.get(siteId);
                    })
                    .orElse(null);
                ProjectDocument buildingDocument = new CustomFinder<>(documentRepository, ProjectDocument.class)
                    .byIdIfExists(buildingParameter.getBuildingDocumentId());
                buildingInstance.change(
                    buildingParameter.getName(),
                    site,
                    buildingParameter.getShape(),
                    buildingParameter.getFloorCount(),
                    buildingParameter.getHeight(),
                    buildingParameter.getBaseArea(),
                    buildingDocument,
                    buildingParameter.getConditionList(),
                    buildingParameter.getInTest(),
                    buildingParameter.getTestTypeList(),
                    buildingParameter.getEstimateFigureDifficulty(),
                    buildingParameter.getEstimateTestDifficulty(),
                    buildingParameter.getEstimateEvaluationDifficulty(),
                    buildingParameter.getEstimateReportDifficulty()
                );
                buildingIdList.add(buildingInstance.getId());
            }
        }

        List<ProjectCustomEstimateComplexBuilding> buildingList = complexBuildingRepository.findByEstimate_Id(id);
        buildingList.forEach((item) -> {
            if (!buildingIdList.contains(item.getId())) {
                complexBuildingRepository.deleteById(item.getId());
            }
        });
    }

    private ProjectCustomEstimate load(Long id) {
        return repository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(ProjectCustomEstimate.KEY, id);
        });
    }

    private String getCode(Project project) {
        Long nextSeq = estimateRepository.findNextSeq(project.getId());

        String code = "";
        code += "Q";
        code += project.getBasic().getCode();
        code += String.format("%02d", nextSeq);

        return code;
    }

}
