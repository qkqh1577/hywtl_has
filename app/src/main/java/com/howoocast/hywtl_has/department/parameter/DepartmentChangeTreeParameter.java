package com.howoocast.hywtl_has.department.parameter;

import java.util.List;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DepartmentChangeTreeParameter {

    @NotNull(message = "부서 항목은 필수입니다.")
    private List<DepartmentTreeParameter> list;

    @Getter
    @Setter
    public static class DepartmentTreeParameter {

        @NotNull(message = "아이디는 필수입니다.")
        private Long id;

        private Long parentId;

        @NotNull(message = "순서는 필수입니다.")
        private Integer seq;
    }

}
