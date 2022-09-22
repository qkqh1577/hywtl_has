package com.howoocast.hywtl_has.estimate_content.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.estimate_content.domain.EstimateContent;
import com.querydsl.core.types.Predicate;
import java.util.List;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface EstimateContentRepository extends CustomRepository<EstimateContent>,
    QuerydslPredicateExecutor<EstimateContent> {

    List<EstimateContent> findAll(Predicate predicate);

}
