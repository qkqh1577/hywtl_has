package com.howoocast.hywtl_has.company.parameter;

import com.howoocast.hywtl_has.company.domain.QCompany;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import org.springframework.lang.Nullable;

import java.util.Objects;

public class CompanyPredicateBuilder {

    private static final QCompany company = QCompany.company;

    private final BooleanBuilder criteria = new BooleanBuilder();

    public CompanyPredicateBuilder keyword(@Nullable String keywordType, @Nullable String keyword) {

        if (Objects.isNull(keyword) || keyword.trim().isEmpty()) {
            return this;
        }

        final String keywordStr = keyword.trim();

        if (Objects.isNull(keywordType) || Objects.equals(keywordType, "by_name")) {
            criteria.and(company.name.containsIgnoreCase(keywordStr));
        } else if (Objects.equals(keywordType, "by_representativeName")) {
            criteria.and(company.representativeName.containsIgnoreCase(keywordStr));
        } else if (Objects.equals(keywordType, "by_companyNumber")) {
            criteria.and(company.companyNumber.containsIgnoreCase(keywordStr));
        }

        return this;
    }

    @Nullable
    public Predicate build() {
        return criteria.getValue();
    }

}
