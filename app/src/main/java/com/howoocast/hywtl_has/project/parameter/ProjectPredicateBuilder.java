package com.howoocast.hywtl_has.project.parameter;

import com.howoocast.hywtl_has.project.domain.QProject;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import java.util.Objects;
import org.springframework.lang.Nullable;

public class ProjectPredicateBuilder {

    private static final QProject project = QProject.project;

    private final BooleanBuilder criteria = new BooleanBuilder();

    public ProjectPredicateBuilder keyword(@Nullable String keyword) {
        if (Objects.nonNull(keyword) && !keyword.isEmpty()) {
            BooleanBuilder keywordCriteria = new BooleanBuilder();
            keywordCriteria.or(project.basic.name.containsIgnoreCase(keyword));
            keywordCriteria.or(project.basic.code.containsIgnoreCase(keyword));
            this.criteria.and(keywordCriteria);
        }
        return this;
    }

    public Predicate build() {
        return this.criteria;
    }

}
