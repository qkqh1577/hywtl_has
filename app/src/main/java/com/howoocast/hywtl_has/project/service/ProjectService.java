package com.howoocast.hywtl_has.project.service;

import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.common.exception.DuplicatedValueException;
import com.howoocast.hywtl_has.common.exception.IllegalRequestException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.domain.ProjectBasicBidType;
import com.howoocast.hywtl_has.project.domain.ProjectEstimateExpectation;
import com.howoocast.hywtl_has.project.domain.ProjectProgressStatus;
import com.howoocast.hywtl_has.project.parameter.ProjectAddParameter;
import com.howoocast.hywtl_has.project.parameter.ProjectStatusUpdateParameter;
import com.howoocast.hywtl_has.project.parameter.ProjectUpdateParameter;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_log.domain.ProjectLogEvent;
import com.howoocast.hywtl_has.project_memo.domain.ProjectMemo;
import com.howoocast.hywtl_has.project_memo.domain.ProjectMemoCategory;
import com.howoocast.hywtl_has.project_memo.repository.ProjectMemoRepository;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import com.querydsl.core.types.Predicate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository repository;
    private final UserRepository userRepository;

    private final ProjectMemoRepository projectMemoRepository;

    private final ApplicationEventPublisher eventPublisher;

    @Transactional(readOnly = true)
    public Page<Project> page(
        Predicate predicate,
        Pageable pageable
    ) {
        return repository.findAll(predicate, pageable);
    }

    @Transactional(readOnly = true)
    public Project getOne(Long id) {
        return this.load(id);
    }


    @Transactional
    public void add(ProjectAddParameter parameter, String username) {

        this.checkName(parameter.getName());

        User receptionManager = userRepository.findById(parameter.getReceptionManagerId())
            .orElseThrow(() -> {
                throw new NotFoundException(
                    User.KEY,
                    "reception_manager",
                    parameter.getReceptionManagerId().toString());
            });
        String code = parameter.getProgressStatus() == ProjectProgressStatus.TEMPORARY ? null : getNextCode();

        Project instance = Project.of(
            code,
            parameter.getName(),
            parameter.getAlias(),
            parameter.getBidType(),
            receptionManager,
            parameter.getProgressStatus()
        );

        instance = repository.save(instance);
        eventPublisher.publishEvent(ProjectLogEvent.of(
            instance,
            "프로젝트 등록"
        ));
        if (Objects.nonNull(parameter.getMemo()) && !parameter.getMemo().isEmpty()) {
            User writer = new CustomFinder<>(userRepository, User.class).byField(username, "username");
            projectMemoRepository.save(ProjectMemo.of(
                instance,
                ProjectMemoCategory.BASIC,
                writer,
                parameter.getMemo(),
                null
            ));
        }
    }

    @Transactional
    public void update(Long id, ProjectUpdateParameter parameter) {
        Project instance = this.load(id);
        User receptionManager = new CustomFinder<>(userRepository, User.class).byIdIfExists(
            parameter.getReceptionManagerId());
        User projectManager = new CustomFinder<>(userRepository, User.class).byIdIfExists(
            parameter.getProjectManagerId());
        User salesManager = new CustomFinder<>(userRepository, User.class).byIdIfExists(parameter.getSalesManagerId());
        List<EventEntity> eventList = instance.getBasic().update(
            parameter.getName(),
            parameter.getAlias(),
            parameter.getBidType(),
            receptionManager,
            salesManager,
            projectManager,
            parameter.getExpectedMonth(),
            parameter.getRequestedMonth(),
            parameter.getIsLh()
        );

        eventList.stream().map(event -> ProjectLogEvent.of(instance, event)).forEach(eventPublisher::publishEvent);
    }

    @Transactional
    public void updateProjectStatus(Long id, ProjectStatusUpdateParameter parameter) {
        Project instance = this.load(id);
        if (Objects.nonNull(parameter.getProgressStatus())) {
            if (parameter.getProgressStatus() == ProjectProgressStatus.TEMPORARY
                && Objects.nonNull(instance.getBasic().getCode())) {
                // 이미 프로젝트 번호가 발급되었는데, 진행현황을 가등록으로 되돌리는 경우
                throw new IllegalRequestException(
                    Project.KEY + ".progress_status.illegal_request",
                    "프로젝트 번호가 발행된 경우 가등록으로 되돌릴 수 없습니다."
                );
            }
            if (parameter.getProgressStatus() != ProjectProgressStatus.TEMPORARY
                && Objects.isNull(instance.getBasic().getCode())) {
                // 프로젝트가 가등록을 벗어나는 경우, 프로젝트 번호 발급
                instance.getBasic().changeCode(this.getNextCode());
                eventPublisher.publishEvent(ProjectLogEvent.of(
                    instance,
                    "프로젝트 코드 발급",
                    null,
                    instance.getBasic().getCode()
                ));
            }
            eventPublisher.publishEvent(ProjectLogEvent.of(
                instance,
                "프로젝트 진행 현황 변경",
                instance.getStatus().getProgressStatus().getName(),
                parameter.getProgressStatus().getName()
            ));
            instance.getStatus().setProgressStatus(parameter.getProgressStatus());

        }

        if (Objects.nonNull(parameter.getEstimateExpectation())) {
            eventPublisher.publishEvent(ProjectLogEvent.of(
                instance,
                "프로젝트 견적 분류 변경",
                Optional.ofNullable(instance.getStatus().getEstimateExpectation()).orElse(ProjectEstimateExpectation.AVERAGE).getName(),
                parameter.getEstimateExpectation().getName()
            ));
            instance.getStatus().setEstimateExpectation(parameter.getEstimateExpectation());
        }

        if (Objects.nonNull(parameter.getEstimateStatus())) {
            if (instance.getBasic().getBidType() == ProjectBasicBidType.DEFAULT) {
                // 견적 구분이 일반일 때만 업데이트 가능
                eventPublisher.publishEvent(ProjectLogEvent.of(
                    instance,
                    "프로젝트 견적 상태 변경",
                    instance.getStatus().getEstimateStatus().getName(),
                    parameter.getEstimateStatus().getName()
                ));
                instance.getStatus().setEstimateStatus(parameter.getEstimateStatus());
            }
        }

        if (Objects.nonNull(parameter.getContractStatus())) {
            eventPublisher.publishEvent(ProjectLogEvent.of(
                instance,
                "프로젝트 계약 상태 변경",
                instance.getStatus().getContractStatus().getName(),
                parameter.getContractStatus().getName()
            ));
            instance.getStatus().setContractStatus(parameter.getContractStatus());
        }
    }


    private void checkName(String name) {
        List<Project> list = repository.findByBasic_Name(name);
        if (list != null && !list.isEmpty()) {
            throw new DuplicatedValueException(
                Project.KEY,
                "name",
                name
            );
        }
    }

    private String getDateString(int year) {
        return String.format("%d-01-01 00:00:00", year);
    }

    private String getNextCode() {
        int year = LocalDateTime.now().getYear();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime startYear = LocalDateTime.parse(getDateString(year), formatter);
        LocalDateTime endYear = LocalDateTime.parse(getDateString(year + 1), formatter);
        Integer count = repository.countByCreatedAtBetween(startYear, endYear);
        return String.format("%d%03d", year, count + 1).substring(2);
    }

    private Project load(Long id) {
        return repository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(Project.KEY, id);
        });
    }
}
