package com.howoocast.hywtl_has.company.repository;

import com.howoocast.hywtl_has.company.domain.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long>, QuerydslPredicateExecutor<Company> {

}
