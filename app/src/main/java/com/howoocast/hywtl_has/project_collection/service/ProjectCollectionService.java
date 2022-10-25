package com.howoocast.hywtl_has.project_collection.service;

import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollection;
import com.howoocast.hywtl_has.project_collection.domain.ProjectCollectionStage;
import com.howoocast.hywtl_has.project_collection.parameter.ProjectCollectionAddStageParameter;
import com.howoocast.hywtl_has.project_collection.parameter.ProjectCollectionChangeStageParameter;
import com.howoocast.hywtl_has.project_collection.repository.ProjectCollectionRepository;
import com.howoocast.hywtl_has.project_collection.repository.ProjectCollectionStageRepository;
import com.howoocast.hywtl_has.project_log.domain.ProjectLogEvent;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import java.util.List;
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
        return repository.findByProject_Id(projectId).orElse(null);
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
        eventList.stream()
            .map(event -> ProjectLogEvent.of(instance.getProject(), event))
            .forEach(eventPublisher::publishEvent);
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
            parameter.getRate(),
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
        List<EventEntity> eventList = instance.change(
            parameter.getName(),
            parameter.getAmount(),
            parameter.getRate(),
            parameter.getExpectedDate(),
            parameter.getNote(),
            parameter.getReason()
        );
        eventList.stream()
            .map(event -> ProjectLogEvent.of(instance.getProjectCollection().getProject(), event))
            .forEach(eventPublisher::publishEvent);
    }

    @Transactional
    public void changeStageSeq(
        Long projectId,
        List<Long> idList
    ) {

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
