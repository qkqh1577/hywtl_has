package com.howoocast.hywtl_has.department.parameter;

import com.howoocast.hywtl_has.department.common.DepartmentCategory;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DepartmentChangeParameter {

    @NotBlank
    private String name;

    @NotNull
    private DepartmentCategory category;

    private String memo;

    @NotNull
    private Integer seq;
}
