package com.howoocast.hywtl_has.department.parameter;

import com.howoocast.hywtl_has.department.domain.Department;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DepartmentIdParameter {

    @NotNull(message = Department.KEY + ".id.not_null")
    private Long id;
}
