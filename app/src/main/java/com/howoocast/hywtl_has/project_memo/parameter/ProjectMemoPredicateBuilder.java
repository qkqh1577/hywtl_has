package com.howoocast.hywtl_has.project_memo.parameter;

import com.howoocast.hywtl_has.project_memo.domain.ProjectMemoCategory;
import com.howoocast.hywtl_has.project_memo.domain.QProjectMemo;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import java.util.Objects;
import org.springframework.lang.Nullable;

public class ProjectMemoPredicateBuilder {

    private static final QProjectMemo projectMemo = QProjectMemo.projectMemo;
    private final BooleanBuilder criteria = new BooleanBuilder();

    private final Long projectId;
    private final String keyword;
    private final ProjectMemoCategory category;

    public ProjectMemoPredicateBuilder(
        Long projectId,
        @Nullable String keyword,
        @Nullable ProjectMemoCategory category
    ) {
        this.projectId = projectId;
        this.keyword = keyword;
        this.category = category;
    }

    private void projectId() {
        this.criteria.and(projectMemo.project.id.eq(this.projectId));
    }

    private void keyword() {
        if (Objects.isNull(this.keyword) || this.keyword.isEmpty()) {
            return;
        }

        BooleanBuilder criteria = new BooleanBuilder();
        criteria.or(projectMemo.description.containsIgnoreCase(this.keyword));
        criteria.or(projectMemo.writer.name.containsIgnoreCase(this.keyword));
        this.criteria.and(criteria);
    }

    private void category() {
        if (this.category == null) {
            return;
        }

        this.criteria.and(projectMemo.category.eq(this.category));
    }

    public Predicate build() {
        this.projectId();
        this.keyword();
        this.category();
        return criteria;
    }
}
