package com.howoocast.hywtl_has.project_contract.service;

import com.howoocast.hywtl_has.business.repository.BusinessRepository;
import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContractCollection;
import com.howoocast.hywtl_has.project_contract.domain.ProjectContractCollectionStage;
import com.howoocast.hywtl_has.project_contract.domain.ProjectFinalContract;
import com.howoocast.hywtl_has.project_contract.parameter.ProjectContractCollectionParameter;
import com.howoocast.hywtl_has.project_contract.parameter.ProjectFinalContractParameter;
import com.howoocast.hywtl_has.project_contract.repository.ProjectContractCollectionRepository;
import com.howoocast.hywtl_has.project_contract.repository.ProjectFinalContractRepository;
import com.howoocast.hywtl_has.project_log.domain.ProjectLogEvent;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
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
    private final ProjectContractCollectionRepository projectContractCollectionRepository;

    @Transactional
    public ProjectFinalContract getFinalContract(Long projectId) {
        return repository.findByProject_Id(projectId)
            .orElse(ProjectFinalContract.of(new CustomFinder<>(projectRepository, Project.class).byId(projectId)));
    }

    @Transactional
    public void updateFinalContract(Long projectId, ProjectFinalContractParameter parameter) {
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

    @Transactional
    public void updateFinalContractCollection(Long projectId, ProjectContractCollectionParameter parameter) {
        repository.findByProject_Id(projectId).ifPresentOrElse(fc -> {
            if (Objects.nonNull(fc.getCollection())) {
                // 이전 값이 있으면 삭제.
                fc.getCollection().delete();
            }
            fc.updateCollection(toCollection(parameter));
        }, ()-> {
            throw new NotFoundException(ProjectContractCollection.KEY, "해당하는 최종 계약서가 없습니다.");
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
}
