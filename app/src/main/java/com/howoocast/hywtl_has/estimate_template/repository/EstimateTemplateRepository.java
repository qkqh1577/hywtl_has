package com.howoocast.hywtl_has.estimate_template.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.estimate_template.domain.EstimateTemplate;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface EstimateTemplateRepository extends CustomRepository<EstimateTemplate>,
    QuerydslPredicateExecutor<EstimateTemplate> {


    @Query("select coalesce(max(i.seq), 0)  from EstimateTemplate i")
    Integer findNextSeq();
}
