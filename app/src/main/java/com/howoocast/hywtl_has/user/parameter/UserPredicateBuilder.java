package com.howoocast.hywtl_has.user.parameter;

import com.howoocast.hywtl_has.user.common.UserRole;
import com.howoocast.hywtl_has.user.domain.QUser;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import java.util.List;
import java.util.Objects;
import org.springframework.lang.Nullable;

public class UserPredicateBuilder {

    private static final QUser user = QUser.user;

    private final BooleanBuilder criteria = new BooleanBuilder();

    public UserPredicateBuilder role(@Nullable List<UserRole> roleList) {
        if (Objects.nonNull(roleList)) {
            criteria.and(user.role.in(roleList));
        }
        return this;
    }

    public UserPredicateBuilder keyword(@Nullable String keywordType, @Nullable String keyword) {
        if (Objects.isNull(keyword) || keyword.trim().isEmpty()) {
            return this;
        }
        final String keywordStr = keyword.trim();

        if (Objects.isNull(keywordType) || Objects.equals(keywordType, "by_name")) {
            criteria.and(user.name.containsIgnoreCase(keywordStr));
        } else if (Objects.equals(keywordType, "by_username")) {
            criteria.and(user.username.containsIgnoreCase(keywordStr));
        } else if (Objects.equals(keywordType, "by_email")) {
            criteria.and(user.email.containsIgnoreCase(keywordStr));
        }

        return this;
    }

    public UserPredicateBuilder keyword(@Nullable String keyword) {
        if (Objects.isNull(keyword) || keyword.trim().isEmpty()) {
            return this;
        }
        final String keywordStr = keyword.trim();
        criteria.or(user.name.containsIgnoreCase(keywordStr));
        criteria.or(user.username.containsIgnoreCase(keywordStr));
        criteria.or(user.email.containsIgnoreCase(keywordStr));
        return this;
    }

    public UserPredicateBuilder department(@Nullable String departmentId) {
        if (Objects.isNull(departmentId) || departmentId.trim().isEmpty()) {
            return this;
        }
        final String departmentIdStr = departmentId.trim();
        criteria.or(user.department.id.eq(Long.parseLong(departmentIdStr)));
        return this;
    }

    @Nullable
    public Predicate build() {
        return criteria;
    }
}