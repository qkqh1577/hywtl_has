package com.howoocast.hywtl_has.business.repository;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.querydsl.core.types.Predicate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface BusinessRepository extends CustomRepository<Business>, QuerydslPredicateExecutor<Business> {

    List<Business> findByRegistrationNumber(String registrationNumber);

    List<Business> findAll(Predicate predicate);

    Page<Business> findAll(Predicate predicate, Pageable pageable);

    Optional<Business> findByName(String s);
}
