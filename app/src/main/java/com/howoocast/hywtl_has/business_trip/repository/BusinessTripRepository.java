package com.howoocast.hywtl_has.business_trip.repository;

import com.howoocast.hywtl_has.business_trip.domain.BusinessTrip;
import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.querydsl.core.types.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.List;

public interface BusinessTripRepository extends CustomRepository<BusinessTrip>, QuerydslPredicateExecutor<BusinessTrip> {

    List<BusinessTrip> findAll(Predicate predicate);

    Page<BusinessTrip> findAll(Predicate predicate, Pageable pageable);

}