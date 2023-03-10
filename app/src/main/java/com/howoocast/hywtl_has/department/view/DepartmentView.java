package com.howoocast.hywtl_has.department.view;

import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.department.domain.DepartmentCategory;
import com.howoocast.hywtl_has.user.view.UserShortView;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class DepartmentView {

    private Long id;
    private String name;
    private DepartmentCategory category;

    private Integer seq;

    private String note;

    private Long parentId;

    private List<DepartmentView> childrenList;

    private List<UserShortView> userList;

    public static DepartmentView assemble(Department source) {
        DepartmentView target = new DepartmentView();
        target.id = source.getId();
        target.name = source.getName();
        target.category = source.getCategory();
        target.seq = source.getSeq();
        target.note = source.getNote();
        if (Objects.nonNull(source.getParent())) {
            target.parentId = source.getParent().getId();
        }
        if (Objects.nonNull(source.getChildrenList())) {
            target.childrenList = source.getChildrenList().stream().map(DepartmentView::assemble)
                .collect(Collectors.toList());
        }
        if (Objects.nonNull(source.getUserList())) {
            target.userList = source.getUserList().stream().map(UserShortView::assemble)
                .collect(Collectors.toList());
        }
        return target;
    }
}
