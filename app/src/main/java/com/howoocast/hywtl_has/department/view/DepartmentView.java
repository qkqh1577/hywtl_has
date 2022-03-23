package com.howoocast.hywtl_has.department.view;

import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.department.domain.DepartmentCategory;
import com.howoocast.hywtl_has.user.view.UserView;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DepartmentView {

    private Long id;
    private String name;
    private DepartmentCategory category;

    private Integer seq;

    private String memo;

    private Long parentId;

    private List<DepartmentView> childrenList;

    private List<UserView> userList;

    public static DepartmentView assemble(Department source) {
        DepartmentView target = new DepartmentView();
        target.id = source.getId();
        target.name = source.getName();
        target.category = source.getCategory();
        target.seq = source.getSeq();
        target.memo = source.getMemo();
        if (Objects.nonNull(source.getParent())) {
            target.parentId = source.getParent().getId();
        }
        if (Objects.nonNull(source.getChildrenList())) {
            target.childrenList = source.getChildrenList().stream().map(DepartmentView::assemble)
                .collect(Collectors.toList());
        }
        if (Objects.nonNull(source.getUserList())) {
            target.userList = source.getUserList().stream().map(UserView::assemble)
                .collect(Collectors.toList());
        }
        return target;
    }
}
