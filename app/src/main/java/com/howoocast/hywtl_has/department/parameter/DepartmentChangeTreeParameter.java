package com.howoocast.hywtl_has.department.parameter;

import com.howoocast.hywtl_has.department.domain.Department;
import java.util.List;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DepartmentChangeTreeParameter {

    @NotNull(message = Department.KEY + ".tree.list.not_null")
    private List<DepartmentTreeParameter> list;

    @Getter
    @Setter
    public static class DepartmentTreeParameter {

        @NotNull(message = Department.KEY + ".tree.id.not_null")
        private Long id;

        private Long parentId;

        @NotNull(message = Department.KEY + ".tree.seq.not_null")
        private Integer seq;
    }

}
