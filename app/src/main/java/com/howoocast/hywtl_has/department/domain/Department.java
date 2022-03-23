package com.howoocast.hywtl_has.department.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.department.repository.DepartmentRepository;
import com.howoocast.hywtl_has.user.domain.User;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
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
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import org.springframework.lang.Nullable;

@Getter
@Entity
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
    protected LocalDateTime removedTime; // 삭제 일자

    @JsonManagedReference
    @OneToMany(mappedBy = "parent")
    @OrderBy("seq")
    private List<Department> childrenList; // 하위 부서 리스트

    @JsonManagedReference
    @OneToMany(mappedBy = "department")
    @OrderBy("id")
    private List<User> userList; // 소속 유저 리스트

    public static Department add(
        DepartmentRepository provider,
        String name,
        DepartmentCategory category,
        @Nullable Long parentId,
        String memo
    ) {
        Department department = new Department();
        department.name = name;
        department.category = category;
        department.seq = 1 + Optional.ofNullable(parentId)
            .map(provider::countByParent_Id)
            .orElse(provider.countByParent_IdNull());
        department.parent = Optional.ofNullable(parentId)
            .map(provider::findById)
            .map(optional -> optional.orElseThrow(NotFoundException::new))
            .orElse(null);
        department.memo = memo;
        return department;
    }


}
