package com.howoocast.hywtl_has.department.parameter;

import java.util.List;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DepartmentChangeTreeParameter {

    @NotNull(message = "department.tree.list.not-null")
    private List<DepartmentTreeParameter> list;

    @Getter
    @Setter
    public static class DepartmentTreeParameter {

        @NotNull(message = "department.tree.id.not-null")
        private Long id;

        private Long parentId;

        @NotNull(message = "department.tree.seq.not-null")
        private Integer seq;
    }

}
