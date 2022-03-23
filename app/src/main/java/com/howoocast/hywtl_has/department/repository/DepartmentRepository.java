package com.howoocast.hywtl_has.department.repository;

import com.howoocast.hywtl_has.department.domain.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

    Integer countByParent_Id(Long parentId);

    Integer countByParent_IdNull();
}
