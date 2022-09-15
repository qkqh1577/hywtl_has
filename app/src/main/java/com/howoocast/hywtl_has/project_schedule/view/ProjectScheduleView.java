package com.howoocast.hywtl_has.project_schedule.view;

import com.howoocast.hywtl_has.project_schedule.domain.ProjectSchedule;
import com.howoocast.hywtl_has.user.view.UserShortView;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class ProjectScheduleView {

    private Long id;
    private String title;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Boolean allDay;
    private String type;
    private Integer alertBefore;
    private UserShortView manager;
    private List<UserShortView> attendanceList;

    public static ProjectScheduleView assemble(ProjectSchedule source) {
        ProjectScheduleView target = new ProjectScheduleView();
        target.id = source.getId();
        target.title = source.getTitle();
        target.startTime = source.getStartTime();
        target.endTime = source.getEndTime();
        target.allDay = source.getAllDay();
        target.type = source.getType();
        target.alertBefore = source.getAlertBefore();
        target.manager = UserShortView.assemble(source.getManager());
        if (Objects.nonNull(source.getAttendanceList())) {
            target.attendanceList = source.getAttendanceList().stream().map(UserShortView::assemble)
                .collect(Collectors.toList());
        }
        return target;
    }

}
