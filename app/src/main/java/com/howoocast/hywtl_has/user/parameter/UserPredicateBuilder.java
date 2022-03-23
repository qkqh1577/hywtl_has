package com.howoocast.hywtl_has.user.parameter;

import com.howoocast.hywtl_has.user.domain.QUser;
import com.howoocast.hywtl_has.user.domain.UserRole;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import java.util.List;
import java.util.Objects;
import org.springframework.lang.Nullable;

public class UserPredicateBuilder {


    private static final QUser user = QUser.user;

    private final BooleanBuilder criteria = new BooleanBuilder();

    public UserPredicateBuilder role(@Nullable List<UserRole> roleList) {
        if (Objects.nonNull(roleList) && !roleList.isEmpty()) {
            criteria.and(user.userRole.in(roleList));
        }
        return this;
    }

    public UserPredicateBuilder keyword(@Nullable String keywordType, @Nullable String keyword) {

        if (Objects.isNull(keyword) || keyword.trim().isEmpty()) {
            return this;
        }
        final String keywordStr = keyword.trim();

        if (Objects.isNull(keywordType) || Objects.equals(keywordType, "이름")) {
            criteria.and(user.name.containsIgnoreCase(keywordStr));
        } else if (Objects.equals(keywordType, "아이디")) {
            criteria.and(user.username.containsIgnoreCase(keywordStr));
        } else if (Objects.equals(keywordType, "이메일")) {
            criteria.and(user.email.containsIgnoreCase(keywordStr));
        }

        return this;
    }

    @Nullable
    public Predicate build() {
        return criteria.getValue();
    }
}