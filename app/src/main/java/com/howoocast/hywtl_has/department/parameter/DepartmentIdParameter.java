package com.howoocast.hywtl_has.department.parameter;

import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DepartmentIdParameter {

    @NotNull(message = "department.id.not-null")
    private Long id;
}
