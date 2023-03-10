package com.howoocast.hywtl_has.project_contract.service;

import com.howoocast.hywtl_has.business.domain.ProjectInvolvedType;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.contract_basic.domain.ContractBasic;
import com.howoocast.hywtl_has.contract_basic.repository.ContractBasicRepository;
import com.howoocast.hywtl_has.contract_collection.domain.ContractCollection;
import com.howoocast.hywtl_has.contract_collection.domain.ContractCollectionStageExpectedDateType;
import com.howoocast.hywtl_has.contract_collection.repository.ContractCollectionRepository;
import com.howoocast.hywtl_has.contract_condition.domain.ContractCondition;
import com.howoocast.hywtl_has.contract_condition.repository.ContractConditionRepository;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicBusiness;
import com.howoocast.hywtl_has.project_basic.repository.ProjectBasicBusinessRepository;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContractBasic;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContractCollection;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContractCollectionStage;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContractCondition;
import com.howoocast.hywtl_has.project_contract.parameter.ProjectContractConditionParameter.Description;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import com.howoocast.hywtl_has.project_estimate.repository.ProjectEstimateRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectContractTemplateService {

    private final ContractBasicRepository basicRepository;

    private final ContractCollectionRepository collectionRepository;

    private final ContractConditionRepository conditionRepository;

    private final ProjectRepository projectRepository;

    private final ProjectEstimateRepository estimateRepository;

    private final ProjectBasicBusinessRepository projectBasicBusinessRepository;


    @Transactional(readOnly = true)
    public ProjectContractBasic basic(Long projectId) {
        Project project = new CustomFinder<>(projectRepository, Project.class).byId(projectId);
        // ?????????
        ProjectBasicBusiness orderer = projectBasicBusinessRepository
            .findByProject_Id(projectId)
            .stream()
            .filter(business -> business.getInvolvedType() == ProjectInvolvedType.ORDERER)
            .findFirst()
            .orElse(null);

        ContractBasic template = basicRepository.findTop1By().orElse(ContractBasic.of());

        return ProjectContractBasic.of(
            project.getBasic().getName(),
            template.getServiceDuration(),
            template.getOutcome(),
            template.getDescription(),
            LocalDate.now(),
            Objects.nonNull(orderer) ? orderer.getBusiness().getAddress() : null,
            Objects.nonNull(orderer) ? orderer.getBusiness().getName() : null,
            Objects.nonNull(orderer) ? orderer.getBusiness().getCeoName() : null,
            Objects.nonNull(template.getContractor()) ? template.getContractor().getAddress() : null,
            Objects.nonNull(template.getContractor()) ? template.getContractor().getCompanyName() : null,
            Objects.nonNull(template.getContractor()) ? template.getContractor().getCeoName() : null
        );
    }

    @Transactional(readOnly = true)
    public ProjectContractCollection collection(
        @Nullable Long estimateId
    ) {
        ContractCollection template = collectionRepository.findTop1By().orElse(ContractCollection.of());
        ProjectEstimate estimate = new CustomFinder<>(estimateRepository, ProjectEstimate.class)
            .byIdIfExists(estimateId);
        return ProjectContractCollection.of(
            basicRepository.findTop1By().orElse(ContractBasic.of()).getCollectionStageNote(),
            template.getStageList().stream()
                .map(stageTemplate -> ProjectContractCollectionStage.of(
                    stageTemplate.getName(),
                    stageTemplate.getRate(),
                    getAmount(estimate, stageTemplate.getRate()),
                    stageTemplate.getNote(),
                    getDate(estimate, stageTemplate.getExpectedDate())))
                .collect(Collectors.toList()),
            template.getTotalAmountNote(),
            getAmount(estimate, 100.0)
        );
    }

    @Transactional(readOnly = true)
    public List<ProjectContractCondition> conditionList(){
        List<ContractCondition> templateList = conditionRepository.findAll();
        return templateList.stream().map(template -> ProjectContractCondition.of(template.getTitle(),
            template.getDescriptionList().stream().map(Description::of).collect(Collectors.toList()))).collect(Collectors.toList());
    }

    private Long getAmount(@Nullable ProjectEstimate estimate, Double rate) {
        if (Objects.isNull(estimate)) {
            return 0L;
        }
        Long totalAmount = estimate.getPlan().getTotalAmount();
        return (long) Math.floor(rate * totalAmount / 100);
    }

    private @Nullable
    LocalDate getDate(@Nullable ProjectEstimate estimate, ContractCollectionStageExpectedDateType dateType) {
        if (Objects.isNull(estimate)) {
            return null;
        }
        if (!Objects.nonNull(estimate.getPlan().getExpectedServiceDate())) {
            return null;
        }

        if (dateType == ContractCollectionStageExpectedDateType.CONTRACT_DAY) {
            return estimate.getPlan().getExpectedServiceDate();
        }
        if (dateType == ContractCollectionStageExpectedDateType.DAY_TO_DELIVER_THOUGH_SNOW_AND_WIND) {
            if (!Objects.nonNull(estimate.getPlan().getExpectedTestDeadline())) {
                return null;
            }
            return estimate.getPlan().getExpectedServiceDate()
                .plusWeeks(estimate.getPlan().getExpectedTestDeadline());
        }
        if (dateType == ContractCollectionStageExpectedDateType.DAY_TO_DELIVER_FOE_FINAL_REPORT) {
            if (!Objects.nonNull(estimate.getPlan().getExpectedFinalReportDeadline())) {
                return null;
            }
            return estimate.getPlan().getExpectedServiceDate()
                .plusWeeks(estimate.getPlan().getExpectedFinalReportDeadline());
        }
        // ?????? ??????
        return null;
    }
}
