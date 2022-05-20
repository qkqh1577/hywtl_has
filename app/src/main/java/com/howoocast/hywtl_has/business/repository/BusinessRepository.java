package com.howoocast.hywtl_has.business.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.business.domain.Business;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface BusinessRepository extends CustomRepository<Business>, QuerydslPredicateExecutor<Business> {

}
