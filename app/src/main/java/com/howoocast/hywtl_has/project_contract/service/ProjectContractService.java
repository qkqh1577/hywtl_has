package com.howoocast.hywtl_has.project_contract.service;

import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.common.exception.IllegalRequestException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.file.domain.FileItem;
import com.howoocast.hywtl_has.file.parameter.FileItemParameter;
import com.howoocast.hywtl_has.file.service.FileItemService;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollection;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStage;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStageVersion;
import com.howoocast.hywtl_has.project_collection.repository.ProjectCollectionRepository;
import com.howoocast.hywtl_has.project_collection.repository.ProjectCollectionStageRepository;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContract;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContractBasic;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContractCollection;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContractCollectionStage;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContractCondition;
import com.howoocast.hywtl_has.project_contract.parameter.ProjectContractBasicParameter;
import com.howoocast.hywtl_has.project_contract.parameter.ProjectContractCollectionParameter;
import com.howoocast.hywtl_has.project_contract.parameter.ProjectContractConditionParameter;
import com.howoocast.hywtl_has.project_contract.parameter.ProjectContractConfirmedParameter;
import com.howoocast.hywtl_has.project_contract.parameter.ProjectContractParameter;
import com.howoocast.hywtl_has.project_contract.repository.ProjectContractRepository;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import com.howoocast.hywtl_has.project_estimate.repository.ProjectEstimateRepository;
import com.howoocast.hywtl_has.project_log.domain.ProjectLogEvent;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.annotation.Nullable;
import javax.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectContractService {

    private final ProjectContractRepository repository;
    private final ProjectEstimateRepository estimateRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final ProjectCollectionRepository projectCollectionRepository;
    private final ProjectCollectionStageRepository stageRepository;
    private final FileItemService fileItemService;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional(readOnly = true)
    public List<ProjectContract> getList(Long projectId) {
        return repository.findByProject_Id(projectId);
    }

    @Transactional(readOnly = true)
    public ProjectContract get(Long id) {
        return this.load(id);
    }

    @Transactional(readOnly = true)
    @Nullable
    public List<ProjectContract> getFinal(Long projectId) {
        return repository.findByProject_IdAndConfirmed(projectId, Boolean.TRUE);
    }

    @Transactional
    public void add(
        Long projectId,
        String username,
        ProjectContractParameter parameter
    ) {
        Project project = new CustomFinder<>(projectRepository, Project.class).byId(projectId);
        ProjectEstimate estimate = new CustomFinder<>(estimateRepository, ProjectEstimate.class).byId(
            parameter.getEstimateId());
        User writer = new CustomFinder<>(userRepository, User.class).byField(username, "username");
        ProjectContract instance = ProjectContract.of(
            project,
            estimate,
            getCode(project),
            parameter.getIsSent(),
            parameter.getRecipient(),
            parameter.getNote(),
            toBasic(parameter.getBasic()),
            toCollection(parameter.getCollection()),
            toConditionList(parameter.getConditionList()),
            writer
        );
        repository.save(instance);
        eventPublisher.publishEvent(ProjectLogEvent.of(
            project,
            "계약서 추가",
            null,
            instance.getCode()
        ));

        convert(parameter.getFile(), instance);
    }

    @Transactional
    public void change(
        Long id,
        ProjectContractParameter parameter
    ) {
        ProjectContract instance = this.load(id);
        ProjectEstimate estimate = new CustomFinder<>(estimateRepository, ProjectEstimate.class).byId(
            parameter.getEstimateId());

        List<EventEntity> eventList = instance.change(
            estimate,
            parameter.getIsSent(),
            parameter.getRecipient(),
            parameter.getNote(),
            toBasic(parameter.getBasic()),
            toCollection(parameter.getCollection()),
            toConditionList(parameter.getConditionList())
        );
        eventList.stream().map(event -> ProjectLogEvent.of(instance.getProject(), event))
            .forEach(eventPublisher::publishEvent);
        convert(parameter.getFile(), instance);
    }

    @Transactional
    public void changePdfFile(
        Long id,
        FileItemParameter parameter
    ) {
        ProjectContract instance = this.load(id);
        FileItem pdfFile = fileItemService.build(parameter);
        List<EventEntity> eventList = instance.changePdfFile(pdfFile);
        eventList.stream().map(event -> ProjectLogEvent.of(instance.getProject(), event))
            .forEach(eventPublisher::publishEvent);
    }

    @Transactional
    public void confirm(Long projectId, ProjectContractConfirmedParameter parameter) {
        List<ProjectContract> list = repository.findByProject_Id(projectId);
        ProjectContract instance = this.load(parameter.getContractId());
        validate(list, instance);
        setConfirmedEstimate(instance);
        updateHistory(list, instance);
        setProjectCollectionInformationByFinalContract(projectId, instance);
    }

    private static void validate(List<ProjectContract> list, ProjectContract instance) {
        if (list.isEmpty()) {
            throw new IllegalRequestException(ProjectContract.KEY + ".is_empty", "선택할 수 있는 계약서가 없습니다.");
        }
        if (instance.getConfirmed()) {
            throw new IllegalRequestException(ProjectContract.KEY + ".already_confirmed", "이미 확정된 계약서입니다.");
        }
    }

    private void updateHistory(List<ProjectContract> list, ProjectContract instance) {
        ProjectContract prev = list.stream()
            .filter(ProjectContract::getConfirmed)
            .findFirst().orElse(null);
        if (Objects.nonNull(prev)) {
            prev.changeConfirmed(Boolean.FALSE);
        }
        instance.changeConfirmed(Boolean.TRUE);
        eventPublisher.publishEvent(ProjectLogEvent.of(
            instance.getProject(),
            "확정 여부 변경",
            Optional.ofNullable(prev).map(ProjectContract::getCode).orElse(null),
            instance.getCode()
        ));
    }

    private void setConfirmedEstimate(ProjectContract instance) {
        estimateRepository.findById(instance.getEstimate().getId()).ifPresent(estimateByContract -> {
            //TODO: 계약서 복수 선택 가능함에 따라 바뀌는 로직
            List<ProjectEstimate> byProjectIdAndConfirmed = estimateRepository.findByProject_IdAndConfirmed(
                instance.getProject().getId(), Boolean.TRUE);
            if (!byProjectIdAndConfirmed.isEmpty()) {
                byProjectIdAndConfirmed.stream().findFirst().ifPresent(estimate -> {
                    if (!estimate.getId().equals(estimateByContract.getId())) {
                        estimateByContract.changeConfirmed(Boolean.TRUE);
                        estimate.changeConfirmed(Boolean.FALSE);
                    }
                });
            }else {
                estimateByContract.changeConfirmed(Boolean.TRUE);
            }
        });
    }

    @Transactional
    public void delete(Long id) {
        ProjectContract instance = this.load(id);
        instance.delete();
    }

    private void setProjectCollectionInformationByFinalContract(Long projectId, ProjectContract instance) {
        List<ProjectCollection> projectCollectionList = projectCollectionRepository.findByProject_Id(projectId);
//        if (projectCollectionList.isEmpty()) {
//            projectCollection = projectCollectionRepository.save(
//                ProjectCollection.of(projectRepository.findById(projectId).orElseThrow(() -> {
//                    throw new NotFoundException(Project.KEY, projectId);
//                })));
//        }
//        List<ProjectCollectionStage> collectionStageList = stageRepository
//            .findByProjectCollection_Id(projectCollection.getId());
//        if (collectionStageList.isEmpty()) {
//            collectionStageList = getCollectionStageList(projectId, instance, projectCollection);
//        } else {
//            stageRepository.findByProjectCollection_Id(projectCollection.getId())
//                .forEach(CustomEntity::delete);
//            collectionStageList = getCollectionStageList(projectId, instance, projectCollection);
//        }
//        projectCollection.setStageList(collectionStageList);
//        setInitVersion(projectCollection);
    }

    private void setInitVersion(ProjectCollection projectCollection) {
        projectCollection.getStageList().forEach(stage -> stage.updateVersionList(ProjectCollectionStageVersion.of(
            stage.getName(),
            stage.getAmount(),
            stage.getExpectedDate(),
            stage.getNote(),
            null)));
    }

    @NotNull
    private List<ProjectCollectionStage> getCollectionStageList(Long projectId, ProjectContract instance,
        ProjectCollection finalProjectCollection) {
        return instance.getCollection()
            .getStageList()
            .stream()
            .map(stage -> stageRepository.save(ProjectCollectionStage.of(
                finalProjectCollection,
                stage.getName(),
                stage.getAmount(),
                stage.getExpectedDate(),
                stage.getNote(),
                this.getNextSeq(projectId)
            ))).collect(Collectors.toList());
    }

    private ProjectContract load(Long id) {
        return repository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(ProjectContract.KEY, id);
        });
    }

    private ProjectContractBasic toBasic(ProjectContractBasicParameter parameter) {
        return ProjectContractBasic.of(
            parameter.getServiceName(),
            parameter.getServiceDuration(),
            parameter.getOutcome(),
            parameter.getDescription(),
            parameter.getContractDate(),
            parameter.getOrdererAddress(),
            parameter.getOrdererCompanyName(),
            parameter.getOrdererCeoName(),
            parameter.getContractorAddress(),
            parameter.getContractorCompanyName(),
            parameter.getContractorCeoName()
        );
    }

    private ProjectContractCollection toCollection(ProjectContractCollectionParameter parameter) {
        return ProjectContractCollection.of(
            parameter.getStageNote(),
            parameter.getStageList().stream().map(item -> ProjectContractCollectionStage.of(
                    item.getName(),
                    item.getRate(),
                    item.getAmount(),
                    item.getNote(),
                    item.getExpectedDate()
                ))
                .collect(Collectors.toList()),
            parameter.getTotalAmountNote(),
            parameter.getTotalAmount()
        );
    }

    private List<ProjectContractCondition> toConditionList(List<ProjectContractConditionParameter> parameterList) {
        return parameterList.stream()
            .map(parameter -> ProjectContractCondition.of(
                parameter.getTitle(),
                parameter.getDescriptionList()
            ))
            .collect(Collectors.toList());
    }

    private String getCode(Project project) {
        Long nextSeq = repository.findNextSeq(project.getId());

        String code = "";
        code += "C";
        code += project.getBasic().getCode();
        code += String.format("%02d", nextSeq);

        return code;
    }

    private void convert(FileItemParameter parameter, ProjectContract instance) {
        try {
            fileItemService.convertToContractPDF(parameter, instance);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private Integer getNextSeq(Long projectId) {
        return stageRepository.findNextSeq(projectId);
    }

}
