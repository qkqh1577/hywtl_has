package com.howoocast.hywtl_has.department.repository;

import com.howoocast.hywtl_has.department.domain.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface DepartmentRepository extends JpaRepository<Department, Long>, QuerydslPredicateExecutor<Department> {

    Integer countByParent_Id(Long parentId);

    Integer countByParent_IdNull();
}
