package com.howoocast.hywtl_has.department.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.department.parameter.DepartmentAddParameter;
import com.howoocast.hywtl_has.department.repository.DepartmentRepository;
import com.howoocast.hywtl_has.department.view.DepartmentView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Transactional(readOnly = true)
    public Page<DepartmentView> page(Pageable pageable) {
        return departmentRepository.findAll(pageable).map(DepartmentView::assemble);
    }

    @Transactional(readOnly = true)
    public DepartmentView get(Long id) {
        return departmentRepository.findById(id).map(DepartmentView::assemble).orElseThrow(NotFoundException::new);
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
        department = departmentRepository.save(department);
        return DepartmentView.assemble(department);
    }
}
