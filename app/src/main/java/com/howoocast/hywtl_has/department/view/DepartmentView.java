package com.howoocast.hywtl_has.department.view;

import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.department.domain.DepartmentCategory;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DepartmentView {

    private Long id;
    private String name;
    private DepartmentCategory category;

    public static DepartmentView assemble(Department source) {
        DepartmentView target = new DepartmentView();
        target.setId(source.getId());
        target.setName(source.getName());
        target.setCategory(source.getCategory());
        return target;
    }
}
