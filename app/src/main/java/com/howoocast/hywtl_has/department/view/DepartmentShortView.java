package com.howoocast.hywtl_has.department.view;

import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.department.common.DepartmentCategory;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DepartmentShortView extends DepartmentItemView {

    private Long id;
    private String name;
    private DepartmentCategory category;
    private DepartmentShortView parent;

    private Long parentId;

    private Integer userCount;
    private Integer childrenCount;

    public static DepartmentShortView assemble(Department source) {
        DepartmentShortView target = new DepartmentShortView();
        target.id = source.getId();
        target.name = source.getName();
        target.category = source.getCategory();
        if (Objects.nonNull(source.getParent())) {
            DepartmentShortView targetParent = new DepartmentShortView();
            targetParent.id = source.getParent().getId();
            targetParent.name = source.getParent().getName();
            targetParent.category = source.getParent().getCategory();
            target.parent = targetParent;
            target.parentId = source.getParent().getId();
        }
        target.userCount = Optional.ofNullable(source.getUserList()).map(List::size).orElse(0);
        target.childrenCount = Optional.ofNullable(source.getChildrenList()).map(List::size).orElse(0);
        return target;
    }
}
