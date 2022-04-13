package com.howoocast.hywtl_has.department.parameter;

import com.howoocast.hywtl_has.department.common.DepartmentCategory;
import com.howoocast.hywtl_has.department.domain.QDepartment;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.springframework.lang.Nullable;

public class DepartmentPredicateBuilder {

    private static QDepartment department = QDepartment.department;

    private final BooleanBuilder criteria = new BooleanBuilder();

    public DepartmentPredicateBuilder parentId(@Nullable Long parentId) {
        criteria.and(
            Optional.ofNullable(parentId)
                .map(id -> department.parent.id.eq(id))
                .orElse(department.parent.isNull())
        );

        return this;
    }

    public DepartmentPredicateBuilder category(@Nullable List<DepartmentCategory> categoryList) {
        if (Objects.nonNull(categoryList) && !categoryList.isEmpty()) {
            criteria.and(department.category.in(categoryList));
        }
        return this;
    }

    @Nullable
    public Predicate build() {
        return criteria.getValue();
    }
}
