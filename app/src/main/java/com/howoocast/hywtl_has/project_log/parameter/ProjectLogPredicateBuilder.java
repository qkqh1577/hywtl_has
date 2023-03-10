package com.howoocast.hywtl_has.project_log.parameter;

import com.howoocast.hywtl_has.project_log.domain.QProjectLog;
import com.howoocast.hywtl_has.user.domain.QUser;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;
import org.springframework.lang.Nullable;

public class ProjectLogPredicateBuilder {

    private static final QProjectLog projectLog = QProjectLog.projectLog;

    private static final QUser user = QUser.user;

    private final BooleanBuilder criteria = new BooleanBuilder();

    public ProjectLogPredicateBuilder searchProject(Long projectId) {
        criteria.and(projectLog.project.id.eq(projectId));
        return this;
    }


    public ProjectLogPredicateBuilder keyword(@Nullable String keyword) {
        if (Objects.nonNull(keyword) && !keyword.isEmpty()) {
            criteria.and(user.username.containsIgnoreCase(keyword));
        }
        return this;
    }

    public ProjectLogPredicateBuilder searchTabName(@Nullable String tabName) {
        if (Objects.nonNull(tabName) && !tabName.isEmpty()) {
            criteria.and(projectLog.tabName.containsIgnoreCase(tabName));
        }
        return this;
    }

    public ProjectLogPredicateBuilder searchCreatedAt(@Nullable LocalDate createdDate) {
        if (Objects.nonNull(createdDate)) {
            LocalDateTime startDate = createdDate.atTime(0, 0, 0);
            LocalDateTime endDate = startDate.plusDays(1).minusSeconds(1);
            criteria.and(projectLog.createdAt.between(startDate, endDate));
        }
        return this;
    }

    public Predicate build() {
        return this.criteria;
    }
}
