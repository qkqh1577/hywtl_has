package com.howoocast.hywtl_has.standard_data.test_service.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.standard_data.test_service.domain.TestServiceTemplate;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface TestServiceTemplateRepository extends CustomRepository<TestServiceTemplate>,
    QuerydslPredicateExecutor<TestServiceTemplate> {

    @Query("select coalesce(max(i.seq), 0)  from TestServiceTemplate i")
    Integer findNextSeq();
}
