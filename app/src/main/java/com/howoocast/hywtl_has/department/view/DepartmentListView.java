package com.howoocast.hywtl_has.department.view;

import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.department.common.DepartmentCategory;
import java.util.List;
import java.util.Optional;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DepartmentListView {

    private Long id;
    private String name;
    private DepartmentCategory category;
    private DepartmentListView parent;

    private Integer userCount;
    private Integer childrenCount;

    public static DepartmentListView assemble(Department source) {
        DepartmentListView target = new DepartmentListView();
        target.id = source.getId();
        target.name = source.getName();
        target.category = source.getCategory();
        target.parent = Optional.ofNullable(source.getParent()).map(sourceParent -> {
            DepartmentListView targetParent = new DepartmentListView();
            targetParent.id = sourceParent.getId();
            targetParent.name = sourceParent.getName();
            targetParent.category = sourceParent.getCategory();
            return targetParent;
        }).orElse(null);
        target.userCount = Optional.ofNullable(source.getUserList()).map(List::size).orElse(0);
        target.childrenCount = Optional.ofNullable(source.getChildrenList()).map(List::size).orElse(0);
        return target;
    }
}
