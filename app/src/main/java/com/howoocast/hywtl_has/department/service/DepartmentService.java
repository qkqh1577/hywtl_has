package com.howoocast.hywtl_has.department.service;

import com.howoocast.hywtl_has.common.exception.DuplicatedValueException;
import com.howoocast.hywtl_has.common.exception.IllegalRequestException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.department.exception.DepartmentViolationParentException;
import com.howoocast.hywtl_has.department.parameter.DepartmentChangeTreeParameter;
import com.howoocast.hywtl_has.department.parameter.DepartmentParameter;
import com.howoocast.hywtl_has.department.repository.DepartmentRepository;
import com.howoocast.hywtl_has.personnel.repository.PersonnelRepository;
import com.howoocast.hywtl_has.user.repository.UserRepository;
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

    private final UserRepository userRepository;

    private final PersonnelRepository personnelRepository;

    @Transactional(readOnly = true)
    public Page<Department> page(
        @Nullable Predicate predicate,
        Pageable pageable
    ) {
        return Optional.ofNullable(predicate)
            .map(p -> repository.findAll(p, pageable))
            .orElse(repository.findAll(pageable))
            .map(department -> {
                department.setChildrenList(repository.findByParent_IdOrderBySeq(department.getId()));
                department.setUserList(userRepository.findByDepartment_Id(department.getId()));
                return department;
            });
    }

    @Transactional(readOnly = true)
    public List<Department> list() {
        return repository.findAll().stream()
            .peek(department -> {
                department.setChildrenList(repository.findByParent_IdOrderBySeq(department.getId()));
                department.setUserList(userRepository.findByDepartment_Id(department.getId()));
            })
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<Department> itemList() {
        return repository.findAll().stream()
            .peek(department -> {
                department.setChildrenList(repository.findByParent_IdOrderBySeq(department.getId()));
                department.setUserList(userRepository.findByDepartment_Id(department.getId()));
            })
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Department get(Long id) {
        return this.load(id);
    }

    @Transactional
    public void upsert(@Nullable Long id, DepartmentParameter parameter) {

        Department parent = this.find(parameter.getParentId());
        Integer seq = repository.countByParent_Id(parameter.getParentId()) + 1;

        Department instance = Optional.ofNullable(id)
            .map(this::load)
            .orElse(Department.of());

        instance.change(
            parameter.getName(),
            parameter.getCategory(),
            parent,
            seq,
            parameter.getNote()
        );
        if (Objects.isNull(id)) {
            instance = repository.save(instance);
        }
        this.checkName(instance);
        this.checkParent(instance);
        arrangeChildrenSeq(parameter.getParentId());
    }


    @Transactional
    public void changeTree(DepartmentChangeTreeParameter parameter) {
        parameter.getList().forEach(item -> this.load(item.getId()).changeParent(
            this.find(item.getParentId()),
            item.getSeq()
        ));
    }

    @Transactional
    public void delete(Long id) {
        Department instance = this.load(id);
        if (Objects.nonNull(instance.getChildrenList()) && !instance.getChildrenList().isEmpty()) {
            throw new IllegalRequestException("department.children_list.not_empty", "하위 조직이 있는 경우 삭제할 수 없습니다.");
        }
        if (!userRepository.findByDepartment_Id(id).isEmpty()
            || !personnelRepository.findByDepartment_Id(id).isEmpty()) {
            throw new IllegalRequestException("department.children_list.not_empty", "소속 사용자가 있는 경우 삭제할 수 없습니다.");
        }
        instance.delete();
    }

    private Department load(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new NotFoundException(Department.KEY, id));
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
                    throw new DuplicatedValueException(Department.KEY, "name", instance.getName());
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
