package com.howoocast.hywtl_has.business.parameter;

import com.howoocast.hywtl_has.business.domain.QBusinessManager;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import org.springframework.lang.Nullable;

public class BusinessManagerPredicateBuilder {
    private static final QBusinessManager businessManager = QBusinessManager.businessManager;

    private final BooleanBuilder criteria = new BooleanBuilder();

    public BusinessManagerPredicateBuilder keyword(Long id, @Nullable String keywordType, @Nullable String keyword) {

        if (keyword == null || keyword.trim().isEmpty()) {
            return this;
        }

        final String keywordStr = keyword.trim();

        if (keywordType == null || keywordType.equals("by_name")) {
            criteria.and(businessManager.name.containsIgnoreCase(keywordStr));
        } else if (keywordType.equals("by_department")) {
            criteria.and(businessManager.department.containsIgnoreCase(keywordStr));
        }

        return this;
    }

    @Nullable
    public Predicate build() {
        return criteria.getValue();
    }
}
