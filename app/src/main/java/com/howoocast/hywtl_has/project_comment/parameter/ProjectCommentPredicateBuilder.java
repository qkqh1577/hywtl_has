package com.howoocast.hywtl_has.project_comment.parameter;

import com.howoocast.hywtl_has.project_comment.domain.QProjectComment;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import java.util.Objects;
import org.springframework.lang.Nullable;

public class ProjectCommentPredicateBuilder {

    private static final QProjectComment projectComment = QProjectComment.projectComment;

    private final BooleanBuilder criteria = new BooleanBuilder();

    public ProjectCommentPredicateBuilder projectId(Long projectId) {
        criteria.and(projectComment.project.id.eq(projectId));
        return this;
    }

    public ProjectCommentPredicateBuilder keyword(@Nullable String keyword) {
        if (Objects.nonNull(keyword) && !keyword.isEmpty()) {
            criteria.and(
                projectComment.description.containsIgnoreCase(keyword)
                    .or(projectComment.writer.name.containsIgnoreCase(keyword))
            );
        }
        return this;
    }

    public Predicate build() {
        criteria.and(projectComment.deletedAt.isNull());
        return criteria;
    }
}
