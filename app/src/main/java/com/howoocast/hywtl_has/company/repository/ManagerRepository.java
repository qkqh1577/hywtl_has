package com.howoocast.hywtl_has.company.repository;

import com.howoocast.hywtl_has.company.domain.Manager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface ManagerRepository extends JpaRepository<Manager, Long>, QuerydslPredicateExecutor<Manager> {

}
