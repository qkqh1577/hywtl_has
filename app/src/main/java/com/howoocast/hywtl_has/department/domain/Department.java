package com.howoocast.hywtl_has.department.domain;

import com.howoocast.hywtl_has.common.domain.CustomEntity;
import com.howoocast.hywtl_has.user.domain.User;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;
import org.springframework.lang.Nullable;

@Slf4j
@Getter
@Entity
@Table(name = Department.KEY)
@Where(clause = "deleted_at is null")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Department extends CustomEntity {

    public static final String KEY = "department";

    /**
     * 조직 이름, 조직명
     */
    @NotBlank
    @Column(nullable = false)
    private String name;

    /**
     * 조직 유형
     */
    @Enumerated(EnumType.STRING)
    private DepartmentCategory category;

    /**
     * 상위 조직
     */
    @ManyToOne
    private Department parent;

    /**
     * 노출 순서, 동일 뎁스에서만 유효
     */
    @NotNull
    @Column(nullable = false)
    private Integer seq;

    /**
     * 설명
     */
    private String note;

    @Setter
    @Transient
    private List<Department> childrenList;

    @Setter
    @Transient
    private List<User> userList;

    public static Department of() {
        return new Department();
    }

    public void change(
        String name,
        DepartmentCategory category,
        @Nullable Department parent,
        Integer seq,
        @Nullable String note
    ) {
        this.name = name;
        this.category = category;
        this.parent = parent;
        this.seq = seq;
        this.note = note;
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
