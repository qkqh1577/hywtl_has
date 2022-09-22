package com.howoocast.hywtl_has.estimate_content.parameter;

import com.howoocast.hywtl_has.estimate_content.domain.QEstimateContent;
import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import java.util.List;
import java.util.Objects;
import javax.annotation.Nullable;

public class EstimateContentPredicateBuilder {

    private static final QEstimateContent estimateContent = QEstimateContent.estimateContent;

    private final BooleanBuilder criteria = new BooleanBuilder();
    private final String keyword;
    private final String keywordType;
    private final List<TestType> testTypeList;

    public EstimateContentPredicateBuilder(
        @Nullable String keyword,
        @Nullable String keywordType,
        @Nullable List<TestType> testTypeList
    ) {
        this.keyword = keyword;
        this.keywordType = keywordType;
        this.testTypeList = testTypeList;
    }

    private void keyword() {
        if (Objects.isNull(this.keyword) || this.keyword.isEmpty()) {
            return;
        }

        if (Objects.isNull(this.keywordType) || Objects.equals(this.keywordType, "by_name")) {
            this.criteria.and(estimateContent.name.containsIgnoreCase(this.keyword));
        }
    }

    private void testTypeList() {
        if (Objects.isNull(this.testTypeList) || this.testTypeList.isEmpty()) {
            return;
        }
        this.testTypeList.forEach(testType -> this.criteria.and(estimateContent.testTypeList.contains(testType)));
    }

    public Predicate build() {
        this.keyword();
        this.testTypeList();
        return this.criteria;
    }

}
