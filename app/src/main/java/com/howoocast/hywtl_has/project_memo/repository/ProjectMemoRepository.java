package com.howoocast.hywtl_has.project_memo.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.project_memo.domain.ProjectMemo;
import java.util.List;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface ProjectMemoRepository extends CustomRepository<ProjectMemo>, QuerydslPredicateExecutor<ProjectMemo> {

    List<ProjectMemo> findByProject_Id(Long id);
}
