package com.howoocast.hywtl_has.department.service;

import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.department.parameter.DepartmentChangeTreeParameter;
import com.howoocast.hywtl_has.department.parameter.DepartmentParameter;
import com.howoocast.hywtl_has.department.repository.DepartmentRepository;
import com.howoocast.hywtl_has.department.view.DepartmentListView;
import com.howoocast.hywtl_has.department.view.DepartmentView;
import com.querydsl.core.types.Predicate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Transactional(readOnly = true)
    public Page<DepartmentListView> page(@Nullable Predicate predicate, Pageable pageable) {
        return Optional.ofNullable(predicate)
            .map(p -> departmentRepository.findAll(p, pageable))
            .orElse(departmentRepository.findAll(pageable))
            .map(DepartmentListView::assemble);
    }

    @Transactional(readOnly = true)
    public List<DepartmentListView> list() {
        return departmentRepository.findByDeletedAtIsNull().stream()
            .map(DepartmentListView::assemble)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public DepartmentView get(Long id) {
        return DepartmentView.assemble(Department.load(departmentRepository, id));
    }

    @Transactional
    public DepartmentView add(DepartmentParameter params) {
        return DepartmentView.assemble(
            Department.of(
                departmentRepository,
                params.getName(),
                params.getCategory(),
                Department.find(departmentRepository, params.getParentId()),
                params.getMemo()
            )
        );
    }

    @Transactional
    public void change(Long id, DepartmentParameter params) {
        Department
            .load(departmentRepository, id)
            .change(
                params.getName(),
                params.getCategory(),
                Department.find(departmentRepository, params.getParentId()),
                params.getMemo()
            );
    }

    @Transactional
    public void changeTree(DepartmentChangeTreeParameter params) {
        params.getList().forEach(item -> Department.load(departmentRepository, item.getId()).changeParent(
            Department.find(departmentRepository, item.getParentId()),
            item.getSeq()
        ));
    }
}
