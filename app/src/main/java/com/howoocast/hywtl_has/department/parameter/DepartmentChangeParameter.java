package com.howoocast.hywtl_has.department.parameter;

import com.howoocast.hywtl_has.department.common.DepartmentCategory;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DepartmentChangeParameter {

    @NotBlank(message = "부서명은 필수입니다.")
    private String name;

    @NotNull(message = "부서 유형은 필수입니다.")
    private DepartmentCategory category;

    private String memo;

    private Long parentId;
}
