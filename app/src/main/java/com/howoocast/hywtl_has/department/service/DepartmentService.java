package com.howoocast.hywtl_has.department.service;

import com.howoocast.hywtl_has.common.service.exception.NotFoundException;
import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.department.parameter.DepartmentAddParameter;
import com.howoocast.hywtl_has.department.parameter.DepartmentChangeParameter;
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
    public Page<DepartmentView> page(@Nullable Predicate predicate, Pageable pageable) {
        return Optional.ofNullable(predicate)
            .map(p -> departmentRepository.findAll(p, pageable))
            .orElse(departmentRepository.findAll(pageable))
            .map(DepartmentView::assemble);
    }

    @Transactional(readOnly = true)
    public List<DepartmentListView> list() {
        return departmentRepository.findAll().stream().map(DepartmentListView::assemble).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public DepartmentView get(Long id) {
        return DepartmentView.assemble(this.load(id));
    }

    @Transactional
    public DepartmentView add(DepartmentAddParameter params) {
        Department department = Department.add(
            departmentRepository,
            params.getName(),
            params.getCategory(),
            params.getParentId(),
            params.getMemo()
        );
        return this.save(department);
    }

    @Transactional
    public DepartmentView changeParent(Long id, @Nullable Long parentId) {
        Department department = this.load(id);
        department.changeParent(departmentRepository, parentId);
        return this.save(department);
    }

    @Transactional
    public DepartmentView change(Long id, DepartmentChangeParameter params) {
        Department department = this.load(id);
        department.change(
            params.getName(),
            params.getCategory(),
            params.getMemo(),
            params.getSeq()
        );
        return this.save(department);
    }

    private Department load(Long id) {
        return departmentRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    private DepartmentView save(Department source) {
        return DepartmentView.assemble(departmentRepository.save(source));
    }
}
