package com.howoocast.hywtl_has.user.view;

import com.howoocast.hywtl_has.department.view.DepartmentItemView;
import com.howoocast.hywtl_has.user.common.UserRole;
import com.howoocast.hywtl_has.user.domain.User;
import lombok.Getter;

@Getter
public class UserShortView {

    private Long id;
    private String username;
    private String email;
    private String name;

    private UserRole role;
    private DepartmentItemView department;

    public static UserShortView assemble(User source) {
        UserShortView target = new UserShortView();
        target.id = source.getId();
        target.username = source.getUsername();
        target.email = source.getEmail();
        target.name = source.getName();
        target.role = source.getRole();
        target.department = DepartmentItemView.assemble(source.getDepartment());

        return target;
    }

}