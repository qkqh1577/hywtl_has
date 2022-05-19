package com.howoocast.hywtl_has.department.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.department.common.DepartmentCategory;
import com.howoocast.hywtl_has.user.domain.User;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.lang.Nullable;

@Slf4j
@Getter
@Entity
@Table(name = "department")
@DynamicUpdate
@Where(clause = "deleted_at is null")
@SQLDelete(sql = "update department set deleted_at = now() where id=?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Department extends CustomEntity {

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

    @JsonManagedReference
    @OneToMany(mappedBy = "parent")
    @OrderBy("seq")
    private List<Department> childrenList; // 하위 부서 리스트

    @JsonManagedReference
    @OneToMany(mappedBy = "department")
    @OrderBy("id")
    private List<User> userList; // 소속 유저 리스트

    //////////////////////////////////
    //// builder
    //////////////////////////////////
    public static Department of() {
        return new Department();
    }

    //////////////////////////////////
    //// checker
    //////////////////////////////////

    //////////////////////////////////
    //// modifier
    //////////////////////////////////
    public void update(
        String name,
        DepartmentCategory category,
        @Nullable Department parent,
        Integer seq,
        String memo
    ) {
        this.name = name;
        this.category = category;
        this.parent = parent;
        this.seq = seq;
        this.memo = memo;
    }

    public void changeParent(
        @Nullable Department parent,
        int seq
    ) {
        this.parent = parent;
        this.seq = seq;
    }

    public void changeSeq(Integer seq) {
        this.seq = seq;
    }
}
