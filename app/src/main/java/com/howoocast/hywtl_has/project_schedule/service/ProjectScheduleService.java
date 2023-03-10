package com.howoocast.hywtl_has.project_schedule.service;

import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.common.exception.IllegalRequestException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.common.service.CustomFinder;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.repository.ProjectRepository;
import com.howoocast.hywtl_has.project_log.domain.ProjectLogEvent;
import com.howoocast.hywtl_has.project_schedule.domain.ProjectSchedule;
import com.howoocast.hywtl_has.project_schedule.parameter.ProjectScheduleParameter;
import com.howoocast.hywtl_has.project_schedule.repository.ProjectScheduleRepository;
import com.howoocast.hywtl_has.user.domain.User;
import com.howoocast.hywtl_has.user.repository.UserRepository;
import com.querydsl.core.types.Predicate;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectScheduleService {


    private final ProjectScheduleRepository repository;

    private final ProjectRepository projectRepository;

    private final UserRepository userRepository;

    private final ApplicationEventPublisher eventPublisher;

    @Transactional(readOnly = true)
    public List<ProjectSchedule> getList(
        Predicate predicate
    ) {
        return repository.findAll(predicate);
    }

    @Transactional(readOnly = true)
    public ProjectSchedule getOne(Long id) {
        return this.load(id);
    }

    @Transactional
    public void add(
        Long projectId,
        ProjectScheduleParameter parameter
    ) {

        if (parameter.getStartTime().isAfter(parameter.getEndTime())) {
            throw new IllegalRequestException("project_schedule.start_time.invalid", "???????????? ??????????????? ?????? ??? ????????????.");
        }

        Project project = new CustomFinder<>(projectRepository, Project.class).byId(projectId);
        User manager = new CustomFinder<>(userRepository, User.class).byId(parameter.getManagerId());
        List<User> attendanceList = Collections.emptyList();
        if (Objects.nonNull(parameter.getAttendanceIdList())) {
            attendanceList = parameter.getAttendanceIdList()
                .stream()
                .map(userId -> new CustomFinder<>(userRepository, User.class).byId(userId))
                .collect(Collectors.toList());
        }

        ProjectSchedule instance = ProjectSchedule.of(
            project,
            "??????",
            parameter.getStartTime(),
            parameter.getEndTime(),
            parameter.getAllDay(),
            parameter.getTitle(),
            parameter.getAlertBefore(),
            manager,
            attendanceList
        );

        repository.save(instance);
        eventPublisher.publishEvent(ProjectLogEvent.of(
            project,
            "?????? ??????"
        ));

    }

    @Transactional
    public void change(Long id, ProjectScheduleParameter parameter) {
        ProjectSchedule instance = this.load(id);
        User manager = new CustomFinder<>(userRepository, User.class).byId(parameter.getManagerId());
        List<User> attendanceList = Collections.emptyList();
        if (Objects.nonNull(parameter.getAttendanceIdList())) {
            attendanceList = parameter.getAttendanceIdList()
                .stream()
                .map(userId -> new CustomFinder<>(userRepository, User.class).byId(userId))
                .collect(Collectors.toList());
        }
        List<EventEntity> eventList = instance.change(
            parameter.getStartTime(),
            parameter.getEndTime(),
            parameter.getAllDay(),
            parameter.getTitle(),
            parameter.getAlertBefore(),
            manager,
            attendanceList
        );
        eventList.stream().map(event -> ProjectLogEvent.of(instance.getProject(), event))
            .forEach(eventPublisher::publishEvent);
    }

    @Transactional
    public void delete(Long id) {
        ProjectSchedule instance = this.load(id);
        instance.delete();
        eventPublisher.publishEvent(ProjectLogEvent.of(
            instance.getProject(),
            "?????? ??????"
        ));
    }


    private ProjectSchedule load(Long id) {
        return repository.findById(id).orElseThrow(() -> {
            throw new NotFoundException(ProjectSchedule.KEY, id);
        });
    }
}
