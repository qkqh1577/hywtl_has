package com.howoocast.hywtl_has.business.repository;

import com.howoocast.hywtl_has.business.domain.BusinessManager;
import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.querydsl.core.types.Predicate;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface BusinessManagerRepository extends CustomRepository<BusinessManager>,
    QuerydslPredicateExecutor<BusinessManager> {
    List<BusinessManager> findAll(Predicate predicate);

    Page<BusinessManager> findAll(Predicate predicate, Pageable pageable);
}
