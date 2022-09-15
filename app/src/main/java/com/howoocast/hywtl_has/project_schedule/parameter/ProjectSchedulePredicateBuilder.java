package com.howoocast.hywtl_has.project_schedule.parameter;

import com.howoocast.hywtl_has.project_schedule.domain.QProjectSchedule;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;
import org.springframework.lang.Nullable;

public class ProjectSchedulePredicateBuilder {


    private static final QProjectSchedule projectSchedule = QProjectSchedule.projectSchedule;

    private final BooleanBuilder criteria = new BooleanBuilder();


    public ProjectSchedulePredicateBuilder dateBetween(@Nullable LocalDate startDate, @Nullable LocalDate endDate) {
        if (Objects.isNull(startDate) || Objects.isNull(endDate)) {
            return this;
        }
        LocalDateTime startTime = startDate.atTime(0, 0, 0);
        LocalDateTime endTime = endDate.atTime(23, 59, 59);

        this.criteria.and(projectSchedule.endTime.after(startTime));
        this.criteria.and(projectSchedule.startTime.before(endTime));

        return this;
    }

    public ProjectSchedulePredicateBuilder project(Long projectId) {
        this.criteria.and(projectSchedule.project.id.eq(projectId));
        return this;
    }

    public ProjectSchedulePredicateBuilder type(@Nullable String type) {
        if (Objects.nonNull(type) && !type.isEmpty()) {
            this.criteria.and(projectSchedule.type.eq(type));
        }

        return this;
    }

    public ProjectSchedulePredicateBuilder keyword(@Nullable String keyword) {

        if (Objects.nonNull(keyword) && !keyword.isEmpty()) {
            this.criteria.and(projectSchedule.title.containsIgnoreCase(keyword));
        }

        return this;
    }

    public Predicate build() {
        return this.criteria;
    }


}
