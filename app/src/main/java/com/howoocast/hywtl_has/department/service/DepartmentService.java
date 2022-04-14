package com.howoocast.hywtl_has.department.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.department.parameter.DepartmentAddParameter;
import com.howoocast.hywtl_has.department.parameter.DepartmentChangeParameter;
import com.howoocast.hywtl_has.department.repository.DepartmentRepository;
import com.howoocast.hywtl_has.department.view.DepartmentListView;
import com.howoocast.hywtl_has.department.view.DepartmentView;
import com.querydsl.core.types.Predicate;
import java.util.List;
import java.util.Objects;
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
        return departmentRepository.findByDeletedTimeIsNull().stream()
            .map(DepartmentListView::assemble)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public DepartmentView get(Long id) {
        return DepartmentView.assemble(this.load(id));
    }

    @Transactional
    public DepartmentView add(DepartmentAddParameter params) {
        return DepartmentView.assemble(Department.add(
            departmentRepository,
            params.getName(),
            params.getCategory(),
            this.find(params.getParentId()),
            params.getMemo()
        ));
    }

    @Transactional
    public DepartmentView change(Long id, DepartmentChangeParameter params) {
        Department department = this.load(id);
        return DepartmentView.assemble(department.change(
            departmentRepository,
            params.getName(),
            params.getCategory(),
            this.find(params.getParentId()),
            params.getMemo()
        ));
    }

    @Nullable
    private Department find(@Nullable Long id) {
        return Objects.isNull(id) ? null : this.load(id);
    }

    private Department load(Long id) {
        return departmentRepository.findByIdAndDeletedTimeIsNull(id).orElseThrow(NotFoundException::new);
    }
}
