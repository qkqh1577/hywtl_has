package com.howoocast.hywtl_has.department.view;

import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.department.domain.DepartmentCategory;
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
    private Long parentId;

    public static DepartmentListView assemble(Department source) {
        DepartmentListView target = new DepartmentListView();
        target.id = source.getId();
        target.name = source.getName();
        target.category = source.getCategory();
        target.parentId = Optional.ofNullable(source.getParent()).map(Department::getId).orElse(null);
        return target;
    }
}
