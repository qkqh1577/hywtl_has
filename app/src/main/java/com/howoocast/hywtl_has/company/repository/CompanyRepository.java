package com.howoocast.hywtl_has.company.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.company.domain.Company;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface CompanyRepository extends CustomRepository<Company>, QuerydslPredicateExecutor<Company> {

}
