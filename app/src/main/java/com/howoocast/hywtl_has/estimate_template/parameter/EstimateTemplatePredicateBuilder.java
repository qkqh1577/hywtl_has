package com.howoocast.hywtl_has.estimate_template.parameter;

import com.howoocast.hywtl_has.estimate_template.domain.QEstimateTemplate;
import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import java.util.List;
import java.util.Objects;
import org.springframework.lang.Nullable;

public class EstimateTemplatePredicateBuilder {

    private static final QEstimateTemplate estimateTemplate = QEstimateTemplate.estimateTemplate;


    private final BooleanBuilder criteria = new BooleanBuilder();

    public EstimateTemplatePredicateBuilder keyword(@Nullable String keywordType, @Nullable String keyword) {
        if (Objects.isNull(keyword) || keyword.isEmpty()) {
            return this;
        }

        if (Objects.isNull(keywordType) || keywordType.isEmpty() || Objects.equals(keywordType, "by_title")) {
            this.criteria.and(estimateTemplate.title.containsIgnoreCase(keyword));
        }

        return this;
    }

    public EstimateTemplatePredicateBuilder testTypeIn(@Nullable List<TestType> testTypeList) {
        if (Objects.isNull(testTypeList) || testTypeList.isEmpty()) {
            return this;
        }

        this.criteria.and(estimateTemplate.testType.in(testTypeList));

        return this;
    }

    public Predicate build() {
        this.criteria.and(estimateTemplate.deletedAt.isNull());
        return this.criteria;
    }
}
