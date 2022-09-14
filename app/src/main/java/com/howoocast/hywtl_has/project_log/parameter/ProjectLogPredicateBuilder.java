package com.howoocast.hywtl_has.project_log.parameter;

import com.howoocast.hywtl_has.project_log.domain.QProjectLog;
import com.howoocast.hywtl_has.user.domain.QUser;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import java.time.LocalDateTime;
import java.util.Objects;
import org.springframework.lang.Nullable;

public class ProjectLogPredicateBuilder {

    private static final QProjectLog projectLog = QProjectLog.projectLog;

    private static final QUser user = QUser.user;

    private final BooleanBuilder criteria = new BooleanBuilder();

    public ProjectLogPredicateBuilder searchProject(Long projectId) {
        if (Objects.nonNull(projectId)) {
            criteria.and(projectLog.project.id.eq(projectId));
        }
        return this;
    }


    public ProjectLogPredicateBuilder keyword(@Nullable Long id) {
        if (Objects.nonNull(id)) {
            criteria.and(user.id.eq(id));
        }
        return this;
    }

    public ProjectLogPredicateBuilder searchTabName(@Nullable String tabName) {
        if (Objects.nonNull(tabName) && !tabName.isEmpty()) {
            criteria.and(projectLog.tabName.containsIgnoreCase(tabName));
        }
        return this;
    }

    public ProjectLogPredicateBuilder searchCreatedAt(@Nullable String createdAt) {
        if (Objects.nonNull(createdAt)) {
            LocalDateTime startDate = LocalDateTime.parse(createdAt + "T00:00:00");
            LocalDateTime endDate = LocalDateTime.parse(createdAt+ "T23:59:59");
            criteria.and(projectLog.createdAt.between(startDate, endDate));
        }
        return this;
    }

    @Nullable
    public Predicate build() {
        return criteria.and(projectLog.deletedAt.isNull()).getValue();
    }
}
