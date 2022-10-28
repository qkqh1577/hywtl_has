package com.howoocast.hywtl_has.department.view;

import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.department.domain.DepartmentCategory;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DepartmentItemView {

    private Long id;
    private String name;
    private DepartmentCategory category;

    public static DepartmentItemView assemble(Department source) {
        DepartmentItemView target = new DepartmentItemView();
        target.id = source.getId();
        target.name = source.getName();
        target.category = source.getCategory();
        return target;
    }
}
