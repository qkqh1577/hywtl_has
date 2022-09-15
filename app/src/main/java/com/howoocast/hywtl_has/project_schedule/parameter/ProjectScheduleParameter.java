package com.howoocast.hywtl_has.project_schedule.parameter;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.howoocast.hywtl_has.project_schedule.domain.ProjectSchedule;
import java.time.LocalDateTime;
import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectScheduleParameter {

    @NotNull(message = ProjectSchedule.KEY + ".start_time.not_null")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime startTime;

    @NotNull(message = ProjectSchedule.KEY + ".end_time.not_null")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime endTime;

    @NotNull(message = ProjectSchedule.KEY + ".all_day.not_null")
    private Boolean allDay;

    @NotBlank(message = ProjectSchedule.KEY + ".title.not_blank")
    private String title;

    private Integer alertBefore;

    @NotNull(message = ProjectSchedule.KEY + ".manager.not_null")
    private Long managerId;

    private List<Long> attendanceIdList;

}
