package com.howoocast.hywtl_has.project_schedule.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.common.domain.EventEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.user.domain.User;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;
import org.springframework.lang.Nullable;

@Slf4j
@Getter
@Entity
@Table(name = ProjectSchedule.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectSchedule extends CustomEntity {

    public static final String KEY = "project_schedule";

    @ManyToOne
    private Project project;

    @NotBlank
    @Column(nullable = false)
    private String type;

    @NotNull
    @Column(nullable = false)
    private LocalDateTime startTime;

    @NotNull
    @Column(nullable = false)
    private LocalDateTime endTime;

    @NotNull
    @Column(nullable = false)
    private Boolean allDay;

    @NotBlank
    @Column(nullable = false)
    private String title;

    private Integer alertBefore;

    @ManyToOne
    private User manager;

    @ManyToMany(cascade = CascadeType.ALL)
    private List<User> attendanceList;

    public static ProjectSchedule of(
        Project project,
        String type,
        LocalDateTime startTime,
        LocalDateTime endTime,
        Boolean allDay,
        String title,
        @Nullable Integer alertBefore,
        User manager,
        List<User> attendanceList
    ) {
        ProjectSchedule instance = new ProjectSchedule();
        instance.project = project;
        instance.type = type;
        instance.change(
            startTime,
            endTime,
            allDay,
            title,
            alertBefore,
            manager,
            attendanceList
        );
        return instance;
    }

    public List<EventEntity> change(
        LocalDateTime startTime,
        LocalDateTime endTime,
        Boolean allDay,
        String title,
        @Nullable Integer alertBefore,
        User manager,
        List<User> attendanceList
    ) {
        List<EventEntity> eventList = new ArrayList<>();
        eventList.add(EventEntity.of(
            "일정 시작 변경",
            this.startTime,
            startTime,
            Objects.equals(Boolean.TRUE, this.allDay)
                || Objects.equals(Boolean.TRUE, allDay)
                ? "yyyy-MM-dd HH:mm"
                : "yyyy-MM-dd"
        ));
        this.startTime = startTime;
        eventList.add(EventEntity.of(
            "일정 종료 변경",
            this.endTime,
            endTime,
            Objects.equals(Boolean.TRUE, this.allDay)
                || Objects.equals(Boolean.TRUE, allDay)
                ? "yyyy-MM-dd HH:mm"
                : "yyyy-MM-dd"
        ));
        this.endTime = endTime;
        eventList.add(EventEntity.of(
            "종일 여부 변경",
            this.allDay,
            allDay
        ));
        this.allDay = allDay;
        eventList.add(EventEntity.of(
            "제목 변경",
            this.title,
            title
        ));
        this.title = title;
        eventList.add(EventEntity.of(
            "알림 일정 변경",
            this.alertBefore,
            alertBefore
        ));
        this.alertBefore = alertBefore;
        eventList.add(EventEntity.of(
            "담당자 변경",
            this.manager,
            manager
        ));
        this.manager = manager;
        eventList.add(EventEntity.of(
            "일정 공유 대상 변경",
            "복합 내용은 일시 정보만 기록함",
            "복합 내용은 일시 정보만 기록함"
        ));
        this.attendanceList = attendanceList;
        return eventList;
    }
}
