package com.howoocast.hywtl_has.project_contract.service;

import com.howoocast.hywtl_has.business.repository.BusinessRepository;
import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollection;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStage;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStageVersion;
import com.howoocast.hywtl_has.project_collection.repository.ProjectCollectionRepository;
import com.howoocast.hywtl_has.project_collection.repository.ProjectCollectionStageRepository;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContractCollection;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContractCollectionStage;
import com.howoocast.hywtl_has.project_contract.domain.ProjectFinalContract;
import com.howoocast.hywtl_has.project_contract.parameter.ProjectContractCollectionParameter;
import com.howoocast.hywtl_has.project_contract.parameter.ProjectFinalContractParameter;
import com.howoocast.hywtl_has.project_contract.repository.ProjectFinalContractRepository;
import com.howoocast.hywtl_has.project_log.domain.ProjectLogEvent;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import javax.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProjectFinalContractService {

    private final ProjectFinalContractRepository repository;
    private final ProjectRepository projectRepository;
    private final BusinessRepository businessRepository;
    private final UserRepository userRepository;
    private final ApplicationEventPublisher eventPublisher;
    private final ProjectCollectionRepository projectCollectionRepository;
    private final ProjectCollectionStageRepository stageRepository;

    @Transactional
    public ProjectFinalContract get(Long projectId) {
        return repository.findByProject_Id(projectId)
            .orElse(ProjectFinalContract.of(new CustomFinder<>(projectRepository, Project.class).byId(projectId)));
    }

    @Transactional
    public void update(Long projectId, ProjectFinalContractParameter parameter) {
        updateFinalContract(projectId, parameter);
        deleteProjectCollectionIfPresentByUpdate(projectId, parameter);
    }

    private void updateFinalContract(Long projectId, ProjectFinalContractParameter parameter) {
        Project project = new CustomFinder<>(projectRepository, Project.class).byId(projectId);
        ProjectFinalContract instance = repository.findByProject_Id(projectId)
            .orElseGet(() -> ProjectFinalContract.of(project));
        List<EventEntity> eventList = instance.update(
            parameter.getContractDate(),
            parameter.getResetContractDate(),
            parameter.getContractType(),
            parameter.getResetContractType(),
            parameter.getCode(),
            parameter.getResetCode(),
            parameter.getEstimateCode(),
            parameter.getResetEstimateCode(),
            parameter.getTargetTest(),
            parameter.getResetTargetTest(),
            parameter.getTestAmount(),
            parameter.getResetTestAmount(),
            parameter.getReviewAmount(),
            parameter.getResetReviewAmount(),
            parameter.getTotalAmount(),
            parameter.getResetTotalAmount(),
            parameter.getSchedule(),
            parameter.getResetSchedule(),

            Objects.nonNull(parameter.getBusinessId())
                ? businessRepository.findById(parameter.getBusinessId())
                .orElse(null) : null,
            parameter.getResetBusinessId(),
            parameter.getNote(),
            parameter.getResetNote(),
            Objects.nonNull(parameter.getWriterId())
                ? userRepository.findById(parameter.getWriterId()).orElse(null)
                : null,
            parameter.getResetWriterId(),
            parameter.getIsSent(),
            parameter.getResetIsSent()
        );
        if (Objects.isNull(instance.getId())) {
            repository.save(instance);
        }
        eventList.stream().map(event -> ProjectLogEvent.of(project, event)).forEach(eventPublisher::publishEvent);
    }

    private void deleteProjectCollectionIfPresentByUpdate(Long projectId, ProjectFinalContractParameter parameter) {
        if (Objects.nonNull(parameter.getTotalAmount()) || Objects.nonNull(parameter.getResetTotalAmount())) {
            repository.findByProject_Id(projectId).ifPresent(fc -> {
                if (Objects.nonNull(fc.getCollection())) {
                    fc.getCollection().delete();
                    fc.updateCollection(null);
                    projectCollectionRepository.findByProject_Id(projectId).ifPresent(c -> {
                        stageRepository.findByProjectCollection_Id(c.getId()).forEach(ProjectCollectionStage::delete);
                        c.delete();
                    });
                }
            });
        }
    }

    @Transactional
    public void updateFinalContractCollection(Long projectId, ProjectContractCollectionParameter parameter) {
        repository.findByProject_Id(projectId).ifPresentOrElse(fc -> {
            if (Objects.nonNull(fc.getCollection())) {
                // ?????? ?????? ????????? ??????.
                fc.getCollection().delete();
            }
            fc.updateCollection(toCollection(parameter));
            setProjectCollectionInformationByFinalContract(projectId, get(projectId));
        }, () -> {
            throw new NotFoundException(ProjectContractCollection.KEY, "???????????? ?????? ???????????? ????????????.");
        });
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

    private void setProjectCollectionInformationByFinalContract(Long projectId, ProjectFinalContract instance) {
        ProjectCollection projectCollection = projectCollectionRepository.findByProject_Id(projectId).orElse(null);
        if (Objects.isNull(projectCollection)) {
            projectCollection = projectCollectionRepository.save(
                ProjectCollection.of(projectRepository.findById(projectId).orElseThrow(() -> {
                    throw new NotFoundException(Project.KEY, projectId);
                })));
        }
        List<ProjectCollectionStage> collectionStageList = stageRepository
            .findByProjectCollection_Id(projectCollection.getId());
        if (collectionStageList.isEmpty()) {
            collectionStageList = getCollectionStageList(projectId, instance, projectCollection);
        } else {
            stageRepository.findByProjectCollection_Id(projectCollection.getId())
                .forEach(CustomEntity::delete);
            collectionStageList = getCollectionStageList(projectId, instance, projectCollection);
        }
        projectCollection.setStageList(collectionStageList);
        setInitVersion(projectCollection);
    }

    @NotNull
    private List<ProjectCollectionStage> getCollectionStageList(Long projectId, ProjectFinalContract instance,
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

    private void setInitVersion(ProjectCollection projectCollection) {
        projectCollection.getStageList().forEach(stage -> stage.updateVersionList(ProjectCollectionStageVersion.of(
            stage.getName(),
            stage.getAmount(),
            stage.getExpectedDate(),
            stage.getNote(),
            null)));
    }

    private Integer getNextSeq(Long projectId) {
        return stageRepository.findNextSeq(projectId);
    }
}
