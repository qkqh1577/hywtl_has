package com.howoocast.hywtl_has.department.parameter;

import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.department.domain.DepartmentCategory;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DepartmentParameter {

    @NotBlank(message = Department.KEY + ".name.not_blank")
    private String name;

    @NotNull(message = Department.KEY + ".category.not_null")
    private DepartmentCategory category;

    private String note;

    private Long parentId;

}
