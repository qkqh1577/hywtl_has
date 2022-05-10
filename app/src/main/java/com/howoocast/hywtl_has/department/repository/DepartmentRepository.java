package com.howoocast.hywtl_has.department.repository;

import com.howoocast.hywtl_has.department.common.DepartmentCategory;
import com.howoocast.hywtl_has.department.domain.Department;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.lang.Nullable;

public interface DepartmentRepository extends JpaRepository<Department, Long>, QuerydslPredicateExecutor<Department> {

    Integer countByParent_IdAndDeletedAtIsNull(@Nullable Long parentId);

    Optional<Department> findByNameAndCategoryAndDeletedAtIsNull(String name, DepartmentCategory category);

    Optional<Department> findByIdAndDeletedAtIsNull(Long id);

    List<Department> findByDeletedAtIsNull();

    List<Department> findByParent_IdAndDeletedAtIsNullOrderBySeq(@Nullable Long id);
}
