package com.howoocast.hywtl_has.department.parameter;

import com.howoocast.hywtl_has.department.common.DepartmentCategory;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DepartmentParameter {

    @NotBlank(message = "department.name.not-blank")
    private String name;

    @NotNull(message = "department.category.not-null")
    private DepartmentCategory category;

    private String memo;

    private Long parentId;

}