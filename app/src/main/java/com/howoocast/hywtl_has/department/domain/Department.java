package com.howoocast.hywtl_has.department.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.department.common.DepartmentCategory;
import com.howoocast.hywtl_has.department.exception.DepartmentNameDuplicatedException;
import com.howoocast.hywtl_has.department.exception.DepartmentViolationParentException;
import com.howoocast.hywtl_has.department.repository.DepartmentRepository;
import com.howoocast.hywtl_has.user.domain.User;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.Nullable;

@Slf4j
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String name; // 부서 이름, 부서명

    @NotNull
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private DepartmentCategory category; // 부서 유형

    @JsonBackReference
    @ManyToOne
    private Department parent; // 상위 부서

    @NotNull
    @Column(nullable = false)
    private Integer seq; // 노출 순서, 동일 뎁스에서만 유효

    private String memo; // 설명

    @NotNull
    @Column(nullable = false, updatable = false)
    protected LocalDateTime createdTime = LocalDateTime.now(); // 생성 일자

    @Column(insertable = false)
    protected LocalDateTime deletedTime; // 삭제 일자

    @JsonManagedReference
    @OneToMany(mappedBy = "parent")
    @OrderBy("seq")
    private List<Department> childrenList; // 하위 부서 리스트

    @JsonManagedReference
    @OneToMany(mappedBy = "department")
    @OrderBy("id")
    private List<User> userList; // 소속 유저 리스트

    @Getter(AccessLevel.NONE)
    @JsonIgnore
    @Transient
    private DepartmentRepository repository;

    //////////////////////////////////
    //// constructor
    //////////////////////////////////
    protected Department(
        DepartmentRepository repository,
        String name,
        DepartmentCategory category,
        @Nullable Department parent,
        String memo
    ) {
        this.repository = repository;
        this.name = name;
        this.category = category;
        this.parent = parent;
        this.memo = memo;
    }

    //////////////////////////////////
    //// getter - setter
    //////////////////////////////////
    private List<Long> getAncestorIdList(Department item, List<Long> list) {
        list.add(item.id);
        if (Objects.isNull(item.parent)) {
            return list;
        }
        return getAncestorIdList(item.parent, list);
    }

    private void setNextSeq() {
        this.seq = 1 + repository
            .countByParent_IdAndDeletedTimeIsNull(
                Objects.isNull(this.parent)
                    ? null
                    : this.parent.id
            );
    }

    //////////////////////////////////
    //// builder
    //////////////////////////////////
    public static Department of(
        DepartmentRepository repository,
        String name,
        DepartmentCategory category,
        @Nullable Department parent,
        String memo
    ) {
        Department department = new Department(
            repository,
            name,
            category,
            parent,
            memo
        );

        department.checkName();
        department.checkParent();
        department.setNextSeq();
        department.save();
        return department;
    }

    //////////////////////////////////
    //// finder
    //////////////////////////////////
    public static Department load(
        DepartmentRepository repository,
        Long id
    ) {
        Department instance = repository.findByIdAndDeletedTimeIsNull(id).orElseThrow(NotFoundException::new);
        instance.repository = repository;
        return instance;
    }

    @Nullable
    public static Department find(
        DepartmentRepository repository,
        Long id
    ) {
        Department instance = repository.findByIdAndDeletedTimeIsNull(id).orElse(null);
        if (Objects.nonNull(instance)) {
            instance.repository = repository;
        }
        return instance;
    }

    //////////////////////////////////
    //// checker
    //////////////////////////////////

    private void checkName() {
        repository.findByNameAndCategoryAndDeletedTimeIsNull(this.name, this.category)
            .ifPresent(department -> {
                if (Objects.isNull(this.id) || !Objects.equals(this.id, department.id)) {
                    throw new DepartmentNameDuplicatedException();
                }
            });
    }

    private void checkParent() {
        if (Objects.isNull(this.parent)) {
            // 최상위를 선택한 경우
            return;
        }
        List<Department> list = repository.findByDeletedTimeIsNull();
        list.stream()
            .map(item -> getAncestorIdList(item, new ArrayList<>()))
            .filter(idList -> !idList.contains(this.id))
            .peek(idList -> log.debug("[Id List] start: {}, size: {}", idList.get(0), idList.size()))
            .peek(idList -> idList.forEach(id -> log.debug("[Id] parent: {}", id)))
            .map(idList -> idList.get(0))
            .filter(id -> Objects.equals(this.parent.id, id))
            .findFirst()
            .orElseThrow(DepartmentViolationParentException::new);
    }

    //////////////////////////////////
    //// modifier
    //////////////////////////////////
    public void change(
        String name,
        DepartmentCategory category,
        @Nullable Department parent,
        String memo
    ) {
        Department prevParent = this.parent;
        this.name = name;
        this.category = category;
        this.parent = parent;
        this.memo = memo;

        this.checkName();
        this.checkParent();
        this.setNextSeq();
        this.save();
        Department.arrangeChildrenSeq(
            repository,
            Objects.isNull(prevParent) ? null : prevParent.id,
            this.id
        );
    }

    public void changeParent(
        @Nullable Department parent,
        int seq
    ) {
        this.parent = parent;
        this.seq = seq;
        this.save();
    }

    private void save() {
        repository.save(this);
    }

    private static void arrangeChildrenSeq(
        DepartmentRepository repository,
        @Nullable Long parentId,
        Long childId
    ) {
        List<Department> childrenList = repository.findByParent_IdAndDeletedTimeIsNullOrderBySeq(parentId).stream()
            .filter(item -> !Objects.equals(item.id, childId))
            .collect(Collectors.toList());
        if (childrenList.isEmpty()) {
            return;
        }
        for (int i = 0; i < childrenList.size(); i++) {
            Department child = childrenList.get(i);
            child.seq = i + 1;
            repository.save(child);
        }
    }
}
