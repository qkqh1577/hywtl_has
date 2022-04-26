package com.howoocast.hywtl_has.project_comment.parameter;

import com.howoocast.hywtl_has.project_comment.domain.QProjectComment;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;

public class ProjectCommentPredicateBuilder {

    private static final QProjectComment projectComment = QProjectComment.projectComment;

    private final BooleanBuilder criteria = new BooleanBuilder();

    public ProjectCommentPredicateBuilder projectId(Long projectId) {
        criteria.and(projectComment.project.id.eq(projectId));
        return this;
    }

    public Predicate build() {
        return criteria;
    }
}
