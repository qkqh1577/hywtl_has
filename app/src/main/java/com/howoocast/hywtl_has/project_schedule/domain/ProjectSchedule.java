package com.howoocast.hywtl_has.project_schedule.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.user.domain.User;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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
    @Column(nullable = false, updatable = false)
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

    @OneToMany(cascade = CascadeType.ALL)
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

    public void change(
        LocalDateTime startTime,
        LocalDateTime endTime,
        Boolean allDay,
        String title,
        @Nullable Integer alertBefore,
        User manager,
        List<User> attendanceList
    ) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.allDay = allDay;
        this.title = title;
        this.alertBefore = alertBefore;
        this.manager = manager;
        this.attendanceList = attendanceList;
    }
}
