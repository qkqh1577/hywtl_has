package com.howoocast.hywtl_has.estimate_template.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.estimate_template.domain.EstimateTemplate;
import com.querydsl.core.types.Predicate;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface EstimateTemplateRepository extends CustomRepository<EstimateTemplate>,
    QuerydslPredicateExecutor<EstimateTemplate> {

    List<EstimateTemplate> findAll(Sort sort);

    List<EstimateTemplate> findAll(Predicate predicate, Sort sort);

}
