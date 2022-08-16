package com.howoocast.hywtl_has.business.parameter;

import com.howoocast.hywtl_has.business.domain.QBusiness;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import org.springframework.lang.Nullable;

import java.util.Objects;

public class BusinessPredicateBuilder {

    private static final QBusiness business = QBusiness.business;

    private final BooleanBuilder criteria = new BooleanBuilder();

    public BusinessPredicateBuilder keyword(@Nullable String keywordType, @Nullable String keyword) {

        if (Objects.isNull(keyword) || keyword.trim().isEmpty()) {
            return this;
        }

        final String keywordStr = keyword.trim();

        if (Objects.isNull(keywordType) || Objects.equals(keywordType, "by_name")) {
            criteria.and(business.name.containsIgnoreCase(keywordStr));
        } else if (Objects.equals(keywordType, "by_ceo_name")) {
            criteria.and(business.representativeName.containsIgnoreCase(keywordStr));
        } else if (Objects.equals(keywordType, "by_registration_number")) {
            criteria.and(business.registrationNumber.containsIgnoreCase(keywordStr));
        }

        return this;
    }

    public BusinessPredicateBuilder keywordForModal(@Nullable String keywordType, @Nullable String keyword) {

        if (Objects.isNull(keyword) || keyword.trim().isEmpty()) {
            return this;
        }

        final String keywordStr = keyword.trim();

        if (Objects.isNull(keywordType) || Objects.equals(keywordType, "by_name")) {
            criteria.and(business.name.containsIgnoreCase(keywordStr));
        } else if (Objects.equals(keywordType, "by_representativeName")) {
            criteria.and(business.representativeName.containsIgnoreCase(keywordStr));
        }

        return this;
    }

    public BusinessPredicateBuilder registrationNumberIs(String registrationNumber) {
        criteria.and(business.registrationNumber.eq(registrationNumber));
        return this;
    }

    @Nullable
    public Predicate build() {
        return criteria.getValue();
    }

}
