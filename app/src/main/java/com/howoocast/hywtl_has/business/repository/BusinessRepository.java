package com.howoocast.hywtl_has.business.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.business.domain.Business;
import com.querydsl.core.types.Predicate;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.Optional;

public interface BusinessRepository extends CustomRepository<Business>, QuerydslPredicateExecutor<Business> {

    List<Business> findByRegistrationNumber(String registrationNumber);

    List<Business> findAll(Predicate predicate);

    Page<Business> findAll(Predicate predicate, Pageable pageable);

}
