package com.howoocast.hywtl_has.standard_data.test_service.parameter;

import com.howoocast.hywtl_has.standard_data.test_service.domain.QTestServiceTemplate;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import java.util.List;
import java.util.Objects;
import org.springframework.lang.Nullable;

public class TestServiceTemplatePredicateBuilder {

    private static final QTestServiceTemplate testServiceTemplate = QTestServiceTemplate.testServiceTemplate;

    private final BooleanBuilder criteria = new BooleanBuilder();

    public TestServiceTemplatePredicateBuilder keyword(@Nullable String keywordType, @Nullable String keyword) {
        if (Objects.isNull(keyword) || keyword.isEmpty()) {
            return this;
        }

        if (Objects.isNull(keywordType) || keywordType.isEmpty() || Objects.equals(keywordType, "by_title")) {
            this.criteria.and(testServiceTemplate.title.containsIgnoreCase(keyword));
        }

        return this;
    }

    public TestServiceTemplatePredicateBuilder testTypeIn(@Nullable List<String> testTypeList) {
        if (Objects.isNull(testTypeList) || testTypeList.isEmpty()) {
            return this;
        }

        this.criteria.and(testServiceTemplate.testType.in(testTypeList));

        return this;
    }

    public Predicate build() {
        this.criteria.and(testServiceTemplate.deletedAt.isNull());
        return this.criteria;
    }
}
