package com.howoocast.hywtl_has.department.parameter;

import com.howoocast.hywtl_has.department.common.DepartmentCategory;
import com.howoocast.hywtl_has.department.domain.QDepartment;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import java.util.List;
import java.util.Objects;
import org.springframework.lang.Nullable;

public class DepartmentPredicateBuilder {

    private static final QDepartment department = QDepartment.department;

    private final BooleanBuilder criteria = new BooleanBuilder();

    public DepartmentPredicateBuilder parentIdIn(@Nullable List<Long> parentIdList) {
        if (Objects.nonNull(parentIdList) && !parentIdList.isEmpty()) {
            criteria.and(department.id.in(parentIdList));
        }
        return this;
    }

    public DepartmentPredicateBuilder categoryIn(@Nullable List<DepartmentCategory> categoryList) {
        if (Objects.nonNull(categoryList) && !categoryList.isEmpty()) {
            criteria.and(department.category.in(categoryList));
        }
        return this;
    }

    public DepartmentPredicateBuilder keyword(@Nullable String keywordType, @Nullable String keyword) {
        if (Objects.nonNull(keyword) && !keyword.isEmpty()) {
            if (Objects.isNull(keywordType) || Objects.equals(keywordType, "by_name")) {
                criteria.and(department.name.containsIgnoreCase(keyword));
            }
        }
        return this;
    }

    @Nullable
    public Predicate build() {
        return criteria.getValue();
    }
}
