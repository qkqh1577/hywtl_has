package com.howoocast.hywtl_has.project_collection.service;

import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollection;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStage;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStageStatus;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStageStatusType;
import com.howoocast.hywtl_has.project_collection.parameter.ProjectCollectionAddStageParameter;
import com.howoocast.hywtl_has.project_collection.parameter.ProjectCollectionChangeStageParameter;
import com.howoocast.hywtl_has.project_collection.repository.ProjectCollectionRepository;
import com.howoocast.hywtl_has.project_collection.repository.ProjectCollectionStageRepository;
import com.howoocast.hywtl_has.project_log.domain.ProjectLogEvent;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectCollectionService {

    private final ProjectCollectionRepository repository;
    private final ProjectCollectionStageRepository stageRepository;
    private final UserRepository userRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional(readOnly = true)
    @Nullable
    public ProjectCollection get(Long projectId) {
        return repository.findByProject_Id(projectId).map(instance -> {
            instance.setStageList(stageRepository.findByProjectCollection_Id(instance.getId()));
            return instance;
        }).orElse(null);
    }

    @Transactional(readOnly = true)
    public ProjectCollectionStage getStage(Long id) {
        return this.loadStage(id);
    }

    @Transactional
    public void updateManager(Long projectId, @Nullable Long userId) {
        ProjectCollection instance = this.load(projectId);
        User user = new CustomFinder<>(userRepository, User.class).byIdIfExists(userId);
        List<EventEntity> eventList = instance.updateManager(user);
        setEventList(eventList, instance);
    }

    @Transactional
    public void addStage(
        Long projectId,
        ProjectCollectionAddStageParameter parameter
    ) {
        ProjectCollection projectCollection = this.load(projectId);
        ProjectCollectionStage instance = ProjectCollectionStage.of(
            projectCollection,
            parameter.getName(),
            parameter.getAmount(),
            parameter.getExpectedDate(),
            parameter.getNote(),
            this.getNextSeq(projectId)
        );

        stageRepository.save(instance);
        eventPublisher.publishEvent(ProjectLogEvent.of(
            projectCollection.getProject(),
            "기성행 추가",
            null,
            instance.getName()
        ));
    }

    @Transactional
    public void changeStage(
        Long id,
        ProjectCollectionChangeStageParameter parameter
    ) {
        ProjectCollectionStage instance = this.loadStage(id);
        List<ProjectCollectionStageStatus> statusList = Optional.ofNullable(parameter.getStatusList())
            .map(list -> list.stream()
                .map(statusParameter -> ProjectCollectionStageStatus.of(
                    statusParameter.getType(),
                    statusParameter.getRequestedDate(),
                    statusParameter.getAmount(),
                    statusParameter.getNote(),
                    statusParameter.getDelayedDate(),
                    statusParameter.getExpectedDate()))
                .collect(Collectors.toList()))
            .orElse(Collections.emptyList());

        ProjectCollectionStageStatus projectCollectionStageStatus = statusList.stream()
            .filter(status -> status.getType() == ProjectCollectionStageStatusType.CARRYOVER
                && Objects.nonNull(status.getDelayedDate()))
            .max(Comparator.comparing(ProjectCollectionStageStatus::getDelayedDate)).orElse(null);
        if (Objects.nonNull(projectCollectionStageStatus) &&
            Objects.nonNull(projectCollectionStageStatus.getDelayedDate())
            && projectCollectionStageStatus.getType() == ProjectCollectionStageStatusType.CARRYOVER) {
            List<EventEntity> eventList = instance.change(
                Boolean.TRUE,
                projectCollectionStageStatus.getDelayedDate(),
                "예정일 변경",
                statusList
            );
            setEventList(eventList, instance.getProjectCollection());
        }

        if (!instance.getAmount().equals(parameter.getAmount())) {
            statusList = new ArrayList<>();
        }

        List<EventEntity> eventList = instance.change(
            parameter.getDirty(),
            parameter.getName(),
            parameter.getAmount(),
            parameter.getExpectedDate(),
            parameter.getNote(),
            parameter.getReason(),
            statusList
        );
        setEventList(eventList, instance.getProjectCollection());
    }

    @Transactional
    public void changeStageSeq(
        Long projectId,
        List<Long> idList
    ) {
        ProjectCollection projectCollection = this.load(projectId);
        List<ProjectCollectionStage> stageList = stageRepository.findByProjectCollection_Id(projectCollection.getId());
        for (int i = 0; i < idList.size(); i++) {
            Long id = idList.get(i);
            ProjectCollectionStage instance = stageList.stream()
                .filter(stage -> Objects.equals(id, stage.getId()))
                .findFirst().orElseThrow(() -> {
                    throw new NotFoundException(ProjectCollectionStage.KEY, id);
                });
            instance.changeSeq(i);
        }
        eventPublisher.publishEvent(ProjectLogEvent.of(
            projectCollection.getProject(),
            "기성행 순서 변경"
        ));
    }

    @Transactional
    public void deleteStage(
        Long id
    ) {
        ProjectCollectionStage instance = this.loadStage(id);
        eventPublisher.publishEvent(
            ProjectLogEvent.of(
                instance.getProjectCollection().getProject(),
                "기성행 삭제",
                instance.getName(),
                null
            )
        );

        instance.delete();
    }

    private void setEventList(List<EventEntity> eventList, ProjectCollection instance) {
        eventList.stream()
            .map(event -> ProjectLogEvent.of(instance.getProject(), event))
            .forEach(eventPublisher::publishEvent);
    }

    private Integer getNextSeq(Long projectId) {
        return stageRepository.findNextSeq(projectId);
    }

    private ProjectCollection load(Long projectId) {
        return repository.findByProject_Id(projectId).orElseThrow(() -> {
            throw new NotFoundException(ProjectCollection.KEY, projectId);
        });
    }

    private ProjectCollectionStage loadStage(Long id) {
        return stageRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(ProjectCollectionStage.KEY, id);
        });
    }
}
