package com.howoocast.hywtl_has.project_memo.parameter;

import com.howoocast.hywtl_has.project_memo.domain.ProjectMemoCategory;
import com.howoocast.hywtl_has.project_memo.domain.QProjectMemo;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import org.springframework.lang.Nullable;

public class ProjectMemoPredicateBuilder {

    private static final QProjectMemo projectMemo = QProjectMemo.projectMemo;
    private final BooleanBuilder criteria = new BooleanBuilder();

    private final Long projectId;
    private final String keywordType;
    private final String keyword;
    private final List<ProjectMemoCategory> categoryList;

    public ProjectMemoPredicateBuilder(
        Long projectId,
        @Nullable String keywordType,
        @Nullable String keyword,
        @Nullable List<ProjectMemoCategory> categoryList
    ) {
        this.projectId = projectId;
        this.keyword = keyword;
        this.keywordType = keywordType;
        this.categoryList = Objects.isNull(categoryList) ? Collections.emptyList() : categoryList;
    }

    private void projectId() {
        this.criteria.and(projectMemo.project.id.eq(this.projectId));
    }

    private void keyword() {
        if (Objects.isNull(this.keyword) || this.keyword.isEmpty()) {
            return;
        }

        BooleanBuilder criteria = new BooleanBuilder();

        boolean isAll =
            Objects.isNull(this.keywordType) || this.keywordType.isEmpty() || this.keywordType.equals("all");

        if (isAll || Objects.equals(this.keywordType, "by_description")) {
            criteria.or(projectMemo.description.containsIgnoreCase(this.keyword));
        }

        if (isAll || Objects.equals(this.keywordType, "by_user_name")) {
            criteria.or(projectMemo.writer.name.containsIgnoreCase(this.keyword));
        }
        this.criteria.and(criteria);
    }

    private void category() {
        if (this.categoryList.isEmpty()) {
            return;
        }

        this.criteria.and(projectMemo.category.in(this.categoryList));
    }

    public Predicate build() {
        this.projectId();
        this.keyword();
        this.category();
        return criteria;
    }
}
