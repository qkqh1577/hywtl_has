package com.howoocast.hywtl_has.department.parameter;

import com.howoocast.hywtl_has.department.domain.DepartmentCategory;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DepartmentAddParameter {

    @NotBlank
    private String name;

    @NotNull
    private DepartmentCategory category;

    private String memo;

    private Long parentId;

}
