package com.howoocast.hywtl_has.department.repository;

import com.howoocast.hywtl_has.common.repository.CustomRepository;
import com.howoocast.hywtl_has.department.common.DepartmentCategory;
import com.howoocast.hywtl_has.department.domain.Department;
import java.util.List;
import java.util.Optional;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.lang.Nullable;

public interface DepartmentRepository extends CustomRepository<Department>, QuerydslPredicateExecutor<Department> {

    Integer countByParent_Id(@Nullable Long parentId);

    Optional<Department> findByNameAndCategory(String name, DepartmentCategory category);

    List<Department> findByParent_IdOrderBySeq(@Nullable Long parentId);
}
