package com.howoocast.hywtl_has.department.service;

import com.howoocast.hywtl_has.common.exception.DuplicatedValueException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.department.exception.DepartmentViolationParentException;
import com.howoocast.hywtl_has.department.parameter.DepartmentChangeTreeParameter;
import com.howoocast.hywtl_has.department.parameter.DepartmentParameter;
import com.howoocast.hywtl_has.department.repository.DepartmentRepository;
import com.howoocast.hywtl_has.department.view.DepartmentItemView;
import com.howoocast.hywtl_has.department.view.DepartmentShortView;
import com.howoocast.hywtl_has.department.view.DepartmentView;
import com.querydsl.core.types.Predicate;
import java.util.ArrayList;
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

    private final DepartmentRepository repository;

    @Transactional(readOnly = true)
    public Page<DepartmentShortView> page(
        @Nullable Predicate predicate,
        Pageable pageable
    ) {
        return Optional.ofNullable(predicate)
            .map(p -> repository.findAll(p, pageable))
            .orElse(repository.findAll(pageable))
            .map(DepartmentShortView::assemble);
    }

    @Transactional(readOnly = true)
    public List<DepartmentShortView> list() {
        return repository.findAll().stream()
            .map(DepartmentShortView::assemble)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<DepartmentItemView> itemList() {
        return repository.findAll().stream()
            .map(DepartmentItemView::assemble)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public DepartmentView get(Long id) {
        return DepartmentView.assemble(this.load(id));
    }

    @Transactional
    public DepartmentView upsert(@Nullable Long id, DepartmentParameter params) {

        Department parent = this.find(params.getParentId());
        Integer seq = repository.countByParent_Id(params.getParentId()) + 1;

        Department instance = Optional.ofNullable(id)
            .map(this::load)
            .orElse(Department.of());

        instance.update(
            params.getName(),
            params.getCategory(),
            parent,
            seq,
            params.getMemo()
        );
        if (Objects.isNull(id)) {
            instance = repository.save(instance);
        }
        this.checkName(instance);
        this.checkParent(instance);
        arrangeChildrenSeq(params.getParentId());
        return DepartmentView.assemble(instance);
    }


    @Transactional
    public void changeTree(DepartmentChangeTreeParameter params) {
        params.getList().forEach(item -> this.load(item.getId()).changeParent(
            this.find(item.getParentId()),
            item.getSeq()
        ));
    }

    private Department load(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new NotFoundException("department", id));
    }

    @Nullable
    private Department find(@Nullable Long id) {
        return Optional.ofNullable(id)
            .map(this::load).orElse(null);
    }

    private void checkName(Department instance) {
        repository.findByNameAndCategory(instance.getName(), instance.getCategory())
            .ifPresent(department -> {
                if (Objects.isNull(instance.getId()) || !Objects.equals(instance.getId(), department.getId())) {
                    throw new DuplicatedValueException("department", "name", instance.getName());
                }
            });
    }

    private List<Long> getAncestorIdList(Department instance, @Nullable List<Long> list) {
        if (Objects.isNull(list)) {
            list = new ArrayList<>();
        }
        list.add(instance.getId());
        if (Objects.isNull(instance.getParent())) {
            return list;
        }
        return getAncestorIdList(instance.getParent(), list);
    }

    private void checkParent(Department instance) {
        if (Objects.isNull(instance.getParent())) {
            // 최상위를 선택한 경우
            return;
        }
        List<Department> list = repository.findAll();
        list.stream()
            .map(item -> getAncestorIdList(item, new ArrayList<>()))
            .filter(idList -> !idList.contains(instance.getId()))
            .peek(idList -> log.debug("[Id List] start: {}, size: {}", idList.get(0), idList.size()))
            .peek(idList -> idList.forEach(id -> log.debug("[Id] parent: {}", id)))
            .map(idList -> idList.get(0))
            .filter(id -> Objects.equals(instance.getParent().getId(), id))
            .findFirst()
            .orElseThrow(DepartmentViolationParentException::new);
    }

    private void arrangeChildrenSeq(@Nullable Long parentId) {
        List<Department> childrenList = repository.findByParent_IdOrderBySeq(parentId);
        if (childrenList.isEmpty()) {
            return;
        }
        for (int i = 0; i < childrenList.size(); i++) {
            childrenList.get(i).changeSeq(i + 1);
        }
    }
}
