package com.howoocast.hywtl_has.estimate_content.parameter;

import com.howoocast.hywtl_has.estimate_content.domain.QEstimateContent;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import java.util.Objects;

public class EstimateContentPredicateBuilder {

    private static final QEstimateContent estimateContent = QEstimateContent.estimateContent;

    private final BooleanBuilder criteria = new BooleanBuilder();
    private final String keyword;

    public EstimateContentPredicateBuilder(
        String keyword
    ) {
        this.keyword = keyword;
    }

    private void keyword() {
        if (Objects.isNull(this.keyword) || this.keyword.isEmpty()) {
            return;
        }

        this.criteria.and(estimateContent.name.containsIgnoreCase(this.keyword));
    }

    public Predicate build() {
        this.keyword();
        return this.criteria;
    }

}
