package com.howoocast.hywtl_has.project_comment.repository;

import com.howoocast.hywtl_has.project_comment.domain.ProjectComment;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface ProjectCommentRepository extends JpaRepository<ProjectComment, Long>,
    QuerydslPredicateExecutor<ProjectComment> {

    Optional<ProjectComment> findByIdAndDeletedAtIsNull(Long id);
}
