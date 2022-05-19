package com.howoocast.hywtl_has.serviceItem.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.serviceItem.domain.ServiceItem;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface ServiceItemRepository extends CustomRepository<ServiceItem>, QuerydslPredicateExecutor<ServiceItem> {
}
