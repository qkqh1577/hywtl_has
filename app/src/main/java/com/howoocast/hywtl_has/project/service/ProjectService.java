package com.howoocast.hywtl_has.project.service;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.common.exception.DuplicatedValueException;
import com.howoocast.hywtl_has.common.exception.IllegalRequestException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.domain.ProjectBasicBidType;
import com.howoocast.hywtl_has.project.domain.ProjectBidStatus;
import com.howoocast.hywtl_has.project.domain.ProjectContractStatus;
import com.howoocast.hywtl_has.project.domain.ProjectEstimateExpectation;
import com.howoocast.hywtl_has.project.domain.ProjectEstimateStatus;
import com.howoocast.hywtl_has.project.domain.ProjectProgressStatus;
import com.howoocast.hywtl_has.project.parameter.ProjectAddParameter;
import com.howoocast.hywtl_has.project.parameter.ProjectSearchParameter;
import com.howoocast.hywtl_has.project.parameter.ProjectStatusUpdateParameter;
import com.howoocast.hywtl_has.project.parameter.ProjectUpdateParameter;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project.repository.ProjectSearchRepository;
import com.howoocast.hywtl_has.project_basic.repository.ProjectBasicBusinessRepository;
import com.howoocast.hywtl_has.project_basic.repository.ProjectBasicDesignRepository;
import com.howoocast.hywtl_has.project_basic.repository.ProjectBasicExternalContributorRepository;
import com.howoocast.hywtl_has.project_basic.repository.ProjectBasicFailReasonRepository;
import com.howoocast.hywtl_has.project_basic.repository.ProjectBasicInternalContributorRepository;
import com.howoocast.hywtl_has.project_bid.repository.ProjectBidRepository;
import com.howoocast.hywtl_has.project_collection.repository.ProjectCollectionRepository;
import com.howoocast.hywtl_has.project_complex.repository.ProjectComplexBuildingRepository;
import com.howoocast.hywtl_has.project_complex.repository.ProjectComplexSiteRepository;
import com.howoocast.hywtl_has.project_document.repository.ProjectDocumentRepository;
import com.howoocast.hywtl_has.project_log.domain.ProjectLogEvent;
import com.howoocast.hywtl_has.project_memo.domain.ProjectMemo;
import com.howoocast.hywtl_has.project_memo.domain.ProjectMemoCategory;
import com.howoocast.hywtl_has.project_memo.repository.ProjectMemoRepository;
import com.howoocast.hywtl_has.project_schedule.repository.ProjectScheduleRepository;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import com.howoocast.hywtl_has.user_notification.domain.UserNotification;
import com.howoocast.hywtl_has.user_notification.repository.UserNotificationRepository;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository repository;
    private final ProjectSearchRepository projectSearchRepository;
    private final UserRepository userRepository;
    private final ProjectMemoRepository projectMemoRepository;
    private final ProjectScheduleRepository projectScheduleRepository;
    private final ProjectDocumentRepository projectDocumentRepository;
    private final ProjectBasicBusinessRepository projectBasicBusinessRepository;
    private final ProjectBasicDesignRepository projectBasicDesignRepository;
    private final ProjectBasicExternalContributorRepository projectBasicExternalContributorRepository;
    private final ProjectBasicInternalContributorRepository projectBasicInternalContributorRepository;
    private final ProjectBasicFailReasonRepository projectBasicFailReasonRepository;
    private final ProjectBidRepository projectBidRepository;
    private final ProjectCollectionRepository projectCollectionRepository;
    private final ProjectComplexBuildingRepository projectComplexBuildingRepository;
    private final ProjectComplexSiteRepository projectComplexSiteRepository;
    private final UserNotificationRepository userNotificationRepository;
    private final ApplicationEventPublisher eventPublisher;


    @Transactional(readOnly = true)
    public List<Project> getList(ProjectSearchParameter parameter) {
        return projectSearchRepository.search(parameter);
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
        String code = parameter.getProgressStatus() == ProjectProgressStatus.TEMPORARY ? null : getNextCode(null);

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
            "???????????? ??????"
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
            parameter.getResetReceptionManagerId(),
            salesManager,
            parameter.getResetSalesManagerId(),
            projectManager,
            parameter.getResetProjectManagerId(),
            parameter.getExpectedMonth(),
            parameter.getResetExpectedMonth(),
            parameter.getRequestedMonth(),
            parameter.getResetRequestedMonth(),
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
                // ?????? ???????????? ????????? ??????????????????, ??????????????? ??????????????? ???????????? ??????
                throw new IllegalRequestException(
                    Project.KEY + ".progress_status.illegal_request",
                    "???????????? ????????? ????????? ?????? ??????????????? ????????? ??? ????????????."
                );
            }
            if (parameter.getProgressStatus() != ProjectProgressStatus.TEMPORARY
                && Objects.isNull(instance.getBasic().getCode())) {
                // ??????????????? ???????????? ???????????? ??????, ???????????? ?????? ??????
                instance.getBasic().changeCode(this.getNextCode(instance.getCreatedAt()));
                eventPublisher.publishEvent(ProjectLogEvent.of(
                    instance,
                    "???????????? ?????? ??????",
                    null,
                    instance.getBasic().getCode()
                ));
            }
            eventPublisher.publishEvent(ProjectLogEvent.of(
                instance,
                "???????????? ?????? ?????? ??????",
                Optional.ofNullable(instance.getStatus().getProgressStatus()).map(ProjectProgressStatus::getName)
                    .orElse(null),
                Optional.ofNullable(parameter.getProgressStatus()).map(ProjectProgressStatus::getName).orElse(null)
            ));
            instance.getStatus().setProgressStatus(parameter.getProgressStatus());

        }

        if (Objects.nonNull(parameter.getEstimateExpectation())) {
            eventPublisher.publishEvent(ProjectLogEvent.of(
                instance,
                "???????????? ?????? ?????? ??????",
                Optional.ofNullable(instance.getStatus().getEstimateExpectation())
                    .map(ProjectEstimateExpectation::getName)
                    .orElse(null),
                Optional.ofNullable(parameter.getEstimateExpectation())
                    .map(ProjectEstimateExpectation::getName)
                    .orElse(null)
            ));
            instance.getStatus().setEstimateExpectation(parameter.getEstimateExpectation());
        }

        if (Objects.nonNull(parameter.getEstimateStatus())) {
            //TODO: [?????? ??????]?????? ????????? ???????????? ?????? ??????.
//            if (instance.getBasic().getBidType() != ProjectBasicBidType.DEFAULT) {
//                // ?????? ????????? ????????? ?????? ???????????? ??????
//                throw new IllegalRequestException(
//                    Project.KEY + ".estimate_status.illegal_request",
//                    "?????? ????????? ????????? ?????? ?????? ????????? ????????? ??? ????????????."
//                );
//            }
            eventPublisher.publishEvent(ProjectLogEvent.of(
                instance,
                "???????????? ?????? ?????? ??????",
                Optional.ofNullable(instance.getStatus().getEstimateStatus())
                    .map(ProjectEstimateStatus::getName)
                    .orElse(null),
                Optional.ofNullable(parameter.getEstimateStatus())
                    .map(ProjectEstimateStatus::getName)
                    .orElse(null)
            ));
            instance.getStatus().setEstimateStatus(parameter.getEstimateStatus());
        }
        if (Objects.nonNull(parameter.getBidStatus())) {
            if (instance.getBasic().getBidType() != ProjectBasicBidType.COMPANY
                && instance.getBasic().getBidType() != ProjectBasicBidType.G2B) {
                // ?????? ????????? ?????? ?????? ??????????????? ?????? ???????????? ??????
                throw new IllegalRequestException(
                    Project.KEY + ".estimate_status.illegal_request",
                    "?????? ????????? ?????? ?????? ??????????????? ?????? ?????? ????????? ????????? ??? ????????????."
                );
            }
            eventPublisher.publishEvent(ProjectLogEvent.of(
                instance,
                "???????????? ?????? ?????? ??????",
                Optional.ofNullable(instance.getStatus().getBidStatus())
                    .map(ProjectBidStatus::getName)
                    .orElse(null),
                Optional.ofNullable(parameter.getBidStatus())
                    .map(ProjectBidStatus::getName)
                    .orElse(null)
            ));
            instance.getStatus().setBidStatus(parameter.getBidStatus());
        }

        if (Objects.nonNull(parameter.getContractStatus())) {
            eventPublisher.publishEvent(ProjectLogEvent.of(
                instance,
                "???????????? ?????? ?????? ??????",
                Optional.ofNullable(instance.getStatus().getContractStatus())
                    .map(ProjectContractStatus::getName)
                    .orElse(null),
                Optional.ofNullable(parameter.getContractStatus())
                    .map(ProjectContractStatus::getName)
                    .orElse(null)
            ));
            instance.getStatus().setContractStatus(parameter.getContractStatus());
        }
    }

    @Transactional
    public void updateFavorite(Long id, ProjectUpdateParameter parameter) {
        Project instance = this.load(id);
        instance.update(parameter.getIsFavorite());
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

    private String getNextCode(@Nullable LocalDateTime createdAt) {
        int year = LocalDateTime.now().getYear();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime startYear = LocalDateTime.parse(getDateString(year), formatter);
        LocalDateTime endYear = LocalDateTime.parse(getDateString(year + 1), formatter);
        Integer count = repository.countByCreatedAtBetween(startYear, endYear);
        if (Objects.nonNull(createdAt)) {
            count = repository.countByCreatedAtBefore(createdAt);
        }
        return String.format("%d%03d", year, count + 1).substring(2);
    }

    private Project load(Long id) {
        return repository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(Project.KEY, id);
        });
    }

    @Transactional
    public void delete(Long id, String userName) {
        Project project = this.load(id);
        userRepository.findByUsername(userName).ifPresent(user -> {
            if (project.getCreatedBy() != user.getId()) {
                throw new IllegalRequestException(
                    Project.KEY + ".delete.illegal_request",
                    "???????????? ???????????? ????????? ??? ????????????."
                );
            }
        });
        if (project.getStatus().getProgressStatus() != ProjectProgressStatus.TEMPORARY
            && Objects.nonNull(project.getBasic().getCode())) {
            throw new IllegalRequestException(
                Project.KEY + ".delete.illegal_request",
                "???????????? ????????? ???????????? ?????? ???????????? ????????? ??? ????????????."
            );
        }
        project.delete();
        deleteAllCascadedByProjectId(id);
    }

    private void deleteAllCascadedByProjectId(Long id) {
        projectMemoRepository.findByProject_Id(id).forEach(CustomEntity::delete);
        projectScheduleRepository.findByProject_Id(id).forEach(CustomEntity::delete);
        projectDocumentRepository.findByProject_Id(id).forEach(CustomEntity::delete);
        projectBasicBusinessRepository.findByProject_Id(id).forEach(CustomEntity::delete);
        projectBasicDesignRepository.findByProject_Id(id).ifPresent(CustomEntity::delete);
        projectBasicExternalContributorRepository.findByProject_Id(id).forEach(CustomEntity::delete);
        projectBasicInternalContributorRepository.findByProject_Id(id).forEach(CustomEntity::delete);
        projectBasicFailReasonRepository.findByProject_Id(id).ifPresent(CustomEntity::delete);
        projectBidRepository.findByProject_Id(id).ifPresent(CustomEntity::delete);
        projectCollectionRepository.findByProject_Id(id).ifPresent(CustomEntity::delete);
        projectComplexBuildingRepository.findByProject_Id(id).forEach(CustomEntity::delete);
        projectComplexSiteRepository.findByProject_Id(id).forEach(CustomEntity::delete);
        userNotificationRepository.findByProject_Id(id).forEach(UserNotification::update);
        //        TODO: ???????????? ???????????? soft delete ??????
    }
}
